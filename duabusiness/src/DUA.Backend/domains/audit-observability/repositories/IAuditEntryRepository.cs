using DUA.Backend.Domains.AuditObservability.Models;

namespace DUA.Backend.Domains.AuditObservability.Repositories;

public interface IAuditEntryRepository
{
    Task<IReadOnlyCollection<AuditEntry>> ListAsync(CancellationToken cancellationToken = default);
}
