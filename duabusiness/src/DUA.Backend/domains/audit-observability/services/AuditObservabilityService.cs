using DUA.Backend.Domains.AuditObservability.Models;
using DUA.Backend.Domains.AuditObservability.Repositories;

namespace DUA.Backend.Domains.AuditObservability.Services;

public sealed class AuditObservabilityService(IAuditEntryRepository auditEntryRepository) : IAuditObservabilityService
{
    public async Task<ActivityReadResponse> ReadActivityAsync(CancellationToken cancellationToken = default)
    {
        var entries = await auditEntryRepository.ListAsync(cancellationToken);
        return new ActivityReadResponse(entries);
    }
}
