using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Domains.ReviewConfirmation.Models;

public sealed record DuaRejectedEvent(Guid ReviewCaseId, DateTimeOffset OccurredAtUtc) : IDomainEvent
{
    public string EventName => "DuaRejected";
}
