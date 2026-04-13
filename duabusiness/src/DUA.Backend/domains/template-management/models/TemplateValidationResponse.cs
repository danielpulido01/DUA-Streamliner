namespace DUA.Backend.Domains.TemplateManagement.Models;

public sealed record TemplateValidationResponse(Guid TemplateId, bool IsValid, IReadOnlyCollection<string> Violations);
