namespace DUA.Backend.Acls.DuaGenerationToReviewConfirmation;

public interface IDuaGenerationToReviewConfirmationFacade
{
    Task<object> BuildReviewCaseAsync(Guid generationJobId, CancellationToken cancellationToken = default);
}
