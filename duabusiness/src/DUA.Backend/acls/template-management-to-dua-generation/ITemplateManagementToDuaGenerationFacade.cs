namespace DUA.Backend.Acls.TemplateManagementToDuaGeneration;

public interface ITemplateManagementToDuaGenerationFacade
{
    Task<object> BuildTemplateContextAsync(Guid templateId, CancellationToken cancellationToken = default);
}
