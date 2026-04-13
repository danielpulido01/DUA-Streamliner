namespace DUA.Backend.Acls.ReviewConfirmationToDistribution;

public sealed class ReviewConfirmationToDistributionFacade : IReviewConfirmationToDistributionFacade
{
    public Task<object> BuildDistributionPayloadAsync(Guid reviewCaseId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
