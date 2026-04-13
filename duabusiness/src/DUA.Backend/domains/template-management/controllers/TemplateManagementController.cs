using DUA.Backend.Domains.TemplateManagement.Models;
using DUA.Backend.Domains.TemplateManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace DUA.Backend.Domains.TemplateManagement.Controllers;

[ApiController]
[Route("api/templates")]
public sealed class TemplateManagementController(ITemplateManagementService templateManagementService) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<UploadTemplateResponse>> UploadAsync(
        [FromBody] UploadTemplateRequest request,
        CancellationToken cancellationToken)
    {
        var response = await templateManagementService.UploadAsync(request, cancellationToken);
        return Accepted(response);
    }

    [HttpPost("{templateId:guid}/validate")]
    public async Task<ActionResult<TemplateValidationResponse>> ValidateAsync(
        Guid templateId,
        CancellationToken cancellationToken)
    {
        var response = await templateManagementService.ValidateAsync(
            new TemplateValidationRequest(templateId),
            cancellationToken);

        return Ok(response);
    }

    [HttpGet("{templateId:guid}")]
    public async Task<ActionResult<DuaTemplate?>> GetAsync(Guid templateId, CancellationToken cancellationToken)
    {
        var response = await templateManagementService.GetAsync(templateId, cancellationToken);
        return Ok(response);
    }
}
