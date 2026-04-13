using DUA.Backend.Domains.AuditObservability.Models;
using DUA.Backend.Domains.AuditObservability.Services;
using Microsoft.AspNetCore.Mvc;

namespace DUA.Backend.Domains.AuditObservability.Controllers;

[ApiController]
[Route("api/activity")]
public sealed class AuditObservabilityController(IAuditObservabilityService auditObservabilityService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ActivityReadResponse>> ReadAsync(CancellationToken cancellationToken)
    {
        var response = await auditObservabilityService.ReadActivityAsync(cancellationToken);
        return Ok(response);
    }
}
