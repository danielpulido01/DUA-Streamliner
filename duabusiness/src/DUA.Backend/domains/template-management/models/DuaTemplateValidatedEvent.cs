using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Domains.TemplateManagement.Models;

public sealed record DuaTemplateValidatedEvent(Guid TemplateId, DateTimeOffset OccurredAtUtc) : IDomainEvent
{
    public string EventName => "DuaTemplateValidated";
}
