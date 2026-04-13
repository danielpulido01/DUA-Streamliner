using DUA.Backend.Domains.DuaGeneration.Models;
using DUA.Backend.Domains.DuaGeneration.Services;
using Microsoft.AspNetCore.Mvc;

namespace DUA.Backend.Domains.DuaGeneration.Controllers;

[ApiController]
[Route("api/generation")]
public sealed class DuaGenerationController(IDuaGenerationService duaGenerationService) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<StartGenerationResponse>> StartAsync(
        [FromBody] StartGenerationRequest request,
        CancellationToken cancellationToken)
    {
        var response = await duaGenerationService.StartAsync(request, cancellationToken);
        return Accepted(response);
    }

    [HttpGet("{generationJobId:guid}")]
    public async Task<ActionResult<GenerationProgressReadModel?>> GetProgressAsync(Guid generationJobId, CancellationToken cancellationToken)
    {
        var response = await duaGenerationService.GetProgressAsync(generationJobId, cancellationToken);
        return Ok(response);
    }

    [HttpPost("{generationJobId:guid}/refresh")]
    public async Task<ActionResult<GenerationProgressReadModel?>> RefreshAsync(Guid generationJobId, CancellationToken cancellationToken)
    {
        var response = await duaGenerationService.RefreshAsync(generationJobId, cancellationToken);
        return Ok(response);
    }

    [HttpGet("{generationJobId:guid}/errors")]
    public async Task<ActionResult<GenerationErrorsResponse>> GetErrorsAsync(Guid generationJobId, CancellationToken cancellationToken)
    {
        var response = await duaGenerationService.GetErrorsAsync(generationJobId, cancellationToken);
        return Ok(response);
    }
}
