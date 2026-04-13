using Microsoft.AspNetCore.Mvc;

namespace DUA.Backend.Controllers;

[ApiController]
[Route("api/metadata")]
public sealed class MetadataController : ControllerBase
{
    [HttpGet("openapi")]
    public IActionResult GetOpenApiLocation()
    {
        return Ok(new
        {
            Name = "DUA Backend OpenAPI Contract",
            Url = "/openapi/dua-backend.openapi.json"
        });
    }
}
