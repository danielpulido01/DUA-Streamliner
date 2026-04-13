namespace DUA.Backend.Acls.DocumentIntakeToDuaGeneration;

public sealed class DocumentIntakeToDuaGenerationFacade : IDocumentIntakeToDuaGenerationFacade
{
    public Task<object> BuildGenerationInputAsync(Guid documentBatchId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
