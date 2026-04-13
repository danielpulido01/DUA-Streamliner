namespace DUA.Backend.Acls.TemplateManagementToDuaGeneration;

public sealed class TemplateManagementToDuaGenerationFacade : ITemplateManagementToDuaGenerationFacade
{
    public Task<object> BuildTemplateContextAsync(Guid templateId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
