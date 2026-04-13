using DUA.Backend.Domains.ReviewConfirmation.Models;
using DUA.Backend.Domains.ReviewConfirmation.Repositories;

namespace DUA.Backend.Domains.ReviewConfirmation.Services;

public sealed class ReviewConfirmationService : IReviewConfirmationService
{
    public ReviewConfirmationService(IReviewCaseRepository reviewCaseRepository)
    {
        ArgumentNullException.ThrowIfNull(reviewCaseRepository);
    }

    public Task<ConfirmDuaResponse> ConfirmAsync(Guid reviewCaseId, ConfirmDuaRequest request, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();

    public Task<RejectDuaResponse> RejectAsync(Guid reviewCaseId, RejectDuaRequest request, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
