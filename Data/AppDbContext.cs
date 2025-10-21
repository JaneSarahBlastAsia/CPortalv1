using Microsoft.EntityFrameworkCore;
using Models.Entities;

namespace Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<NotificationPreference> NotificationPreferences { get; set; }
        public DbSet<Security> Securities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Address)
                .WithOne(a => a.Customer)
                .HasForeignKey<Address>(a => a.CustomerId);

            modelBuilder.Entity<Customer>()
                .HasOne(c => c.NotificationPreference)
                .WithOne(np => np.Customer)
                .HasForeignKey<NotificationPreference>(np => np.CustomerId);

            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Security)
                .WithOne(s => s.Customer)
                .HasForeignKey<Security>(s => s.CustomerId);
        }
    }
}