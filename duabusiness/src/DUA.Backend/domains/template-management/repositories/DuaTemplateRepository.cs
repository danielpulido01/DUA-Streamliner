using DUA.Backend.Domains.TemplateManagement.Models;

namespace DUA.Backend.Domains.TemplateManagement.Repositories;

public sealed class DuaTemplateRepository : IDuaTemplateRepository
{
    public Task<DuaTemplate?> GetAsync(Guid templateId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
