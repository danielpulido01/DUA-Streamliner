namespace DUA.Backend.Domains.AuditObservability.Models;

public sealed record ActivityReadResponse(IReadOnlyCollection<AuditEntry> Entries);
