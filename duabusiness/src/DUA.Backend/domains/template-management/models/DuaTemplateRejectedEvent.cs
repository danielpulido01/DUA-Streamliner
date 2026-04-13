using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Domains.TemplateManagement.Models;

public sealed record DuaTemplateRejectedEvent(Guid TemplateId, DateTimeOffset OccurredAtUtc) : IDomainEvent
{
    public string EventName => "DuaTemplateRejected";
}
