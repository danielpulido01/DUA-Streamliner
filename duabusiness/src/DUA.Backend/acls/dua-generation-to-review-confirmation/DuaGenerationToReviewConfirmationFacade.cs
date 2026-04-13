namespace DUA.Backend.Acls.DuaGenerationToReviewConfirmation;

public sealed class DuaGenerationToReviewConfirmationFacade : IDuaGenerationToReviewConfirmationFacade
{
    public Task<object> BuildReviewCaseAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
