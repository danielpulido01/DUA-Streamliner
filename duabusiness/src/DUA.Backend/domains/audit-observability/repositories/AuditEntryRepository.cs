using DUA.Backend.Domains.AuditObservability.Models;

namespace DUA.Backend.Domains.AuditObservability.Repositories;

public sealed class AuditEntryRepository : IAuditEntryRepository
{
    public Task<IReadOnlyCollection<AuditEntry>> ListAsync(CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
