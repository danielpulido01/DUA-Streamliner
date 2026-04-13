namespace DUA.Backend.Acls.ReviewConfirmationToDistribution;

public interface IReviewConfirmationToDistributionFacade
{
    Task<object> BuildDistributionPayloadAsync(Guid reviewCaseId, CancellationToken cancellationToken = default);
}
