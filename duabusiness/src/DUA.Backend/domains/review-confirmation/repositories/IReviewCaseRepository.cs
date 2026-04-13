using DUA.Backend.Domains.ReviewConfirmation.Models;

namespace DUA.Backend.Domains.ReviewConfirmation.Repositories;

public interface IReviewCaseRepository
{
    Task<ReviewCase?> GetAsync(Guid reviewCaseId, CancellationToken cancellationToken = default);
}
