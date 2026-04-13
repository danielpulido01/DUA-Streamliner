using DUA.Backend.Domains.TemplateManagement.Models;

namespace DUA.Backend.Domains.TemplateManagement.Repositories;

public interface IDuaTemplateRepository
{
    Task<DuaTemplate?> GetAsync(Guid templateId, CancellationToken cancellationToken = default);
}
