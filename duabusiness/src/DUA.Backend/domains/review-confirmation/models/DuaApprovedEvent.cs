using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Domains.ReviewConfirmation.Models;

public sealed record DuaApprovedEvent(Guid ReviewCaseId, DateTimeOffset OccurredAtUtc) : IDomainEvent
{
    public string EventName => "DuaApproved";
}
