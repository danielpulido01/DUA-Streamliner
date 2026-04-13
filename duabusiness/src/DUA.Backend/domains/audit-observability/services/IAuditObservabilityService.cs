using DUA.Backend.Domains.AuditObservability.Models;

namespace DUA.Backend.Domains.AuditObservability.Services;

public interface IAuditObservabilityService
{
    Task<ActivityReadResponse> ReadActivityAsync(CancellationToken cancellationToken = default);
}
