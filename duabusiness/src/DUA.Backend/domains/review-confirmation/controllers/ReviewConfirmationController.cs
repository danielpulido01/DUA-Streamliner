using DUA.Backend.Domains.ReviewConfirmation.Models;
using DUA.Backend.Domains.ReviewConfirmation.Services;
using Microsoft.AspNetCore.Mvc;

namespace DUA.Backend.Domains.ReviewConfirmation.Controllers;

[ApiController]
[Route("api/reviews")]
public sealed class ReviewConfirmationController(IReviewConfirmationService reviewConfirmationService) : ControllerBase
{
    [HttpPost("{reviewCaseId:guid}/confirm")]
    public async Task<ActionResult<ConfirmDuaResponse>> ConfirmAsync(
        Guid reviewCaseId,
        [FromBody] ConfirmDuaRequest request,
        CancellationToken cancellationToken)
    {
        var response = await reviewConfirmationService.ConfirmAsync(reviewCaseId, request, cancellationToken);
        return Ok(response);
    }

    [HttpPost("{reviewCaseId:guid}/reject")]
    public async Task<ActionResult<RejectDuaResponse>> RejectAsync(
        Guid reviewCaseId,
        [FromBody] RejectDuaRequest request,
        CancellationToken cancellationToken)
    {
        var response = await reviewConfirmationService.RejectAsync(reviewCaseId, request, cancellationToken);
        return Ok(response);
    }
}
