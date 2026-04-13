using DUA.Backend.Domains.Distribution.Models;
using DUA.Backend.Domains.Distribution.Services;
using Microsoft.AspNetCore.Mvc;

namespace DUA.Backend.Domains.Distribution.Controllers;

[ApiController]
[Route("api/dua")]
public sealed class DistributionController(IDistributionService distributionService) : ControllerBase
{
    [HttpGet("{generationJobId:guid}/preview")]
    public async Task<ActionResult<PreviewDuaResponse?>> PreviewAsync(Guid generationJobId, CancellationToken cancellationToken)
    {
        var response = await distributionService.PreviewAsync(generationJobId, cancellationToken);
        return Ok(response);
    }

    [HttpGet("{artifactId:guid}/download")]
    public async Task<ActionResult<DownloadDuaResponse?>> DownloadAsync(Guid artifactId, CancellationToken cancellationToken)
    {
        var response = await distributionService.DownloadAsync(artifactId, cancellationToken);
        return Ok(response);
    }
}
