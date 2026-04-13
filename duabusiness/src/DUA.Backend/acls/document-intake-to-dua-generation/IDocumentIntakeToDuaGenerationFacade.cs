namespace DUA.Backend.Acls.DocumentIntakeToDuaGeneration;

public interface IDocumentIntakeToDuaGenerationFacade
{
    Task<object> BuildGenerationInputAsync(Guid documentBatchId, CancellationToken cancellationToken = default);
}
