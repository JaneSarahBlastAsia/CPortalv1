using Microsoft.AspNetCore.Mvc;

namespace CPortalv1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    /// <summary>
    /// Health check endpoint for Kubernetes
    /// </summary>
    /// <returns>Health status information</returns>
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "healthy",
            timestamp = DateTime.UtcNow,
            service = "CPortalv1"
        });
    }
}
