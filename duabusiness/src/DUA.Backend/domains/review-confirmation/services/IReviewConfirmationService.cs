using DUA.Backend.Domains.ReviewConfirmation.Models;

namespace DUA.Backend.Domains.ReviewConfirmation.Services;

public interface IReviewConfirmationService
{
    Task<ConfirmDuaResponse> ConfirmAsync(Guid reviewCaseId, ConfirmDuaRequest request, CancellationToken cancellationToken = default);

    Task<RejectDuaResponse> RejectAsync(Guid reviewCaseId, RejectDuaRequest request, CancellationToken cancellationToken = default);
}
