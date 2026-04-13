using DUA.Backend.Domains.ReviewConfirmation.Models;

namespace DUA.Backend.Domains.ReviewConfirmation.Repositories;

public sealed class ReviewCaseRepository : IReviewCaseRepository
{
    public Task<ReviewCase?> GetAsync(Guid reviewCaseId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
