using Microsoft.EntityFrameworkCore;
using Data; // Add our AppDbContext namespace
using CPortalv1.Middleware;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Razor Pages and MVC services for error pages
builder.Services.AddRazorPages();
builder.Services.AddMvc();

// Add Entity Framework services
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

// Add error handling for both development and production
app.UseExceptionHandler("/Error");
app.UseStatusCodePagesWithReExecute("/Error/{0}");

app.UseHttpsRedirection();
app.UseStaticFiles();

// -------- CUSTOM STATIC REDIRECT --------
var defaultPage = app.Configuration["StaticFiles:DefaultPage"];
if (!string.IsNullOrEmpty(defaultPage))
{
    app.Use(async (context, next) =>
    {
        if (context.Request.Path == "/" || context.Request.Path == "")
        {
            context.Response.Redirect($"/{defaultPage}");
            return;
        }
        await next();
    });
}
// -------- END CUSTOM STATIC REDIRECT ----

app.UseRouting();

app.UseAuthorization();

// Add Database Initialization Middleware
app.UseMiddleware<DatabaseInitializationMiddleware>();

app.MapControllers();
app.MapRazorPages();

app.Run();
