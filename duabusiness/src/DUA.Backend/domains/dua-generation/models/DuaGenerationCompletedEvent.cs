using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Domains.DuaGeneration.Models;

public sealed record DuaGenerationCompletedEvent(Guid GenerationJobId, DateTimeOffset OccurredAtUtc) : IDomainEvent
{
    public string EventName => "DuaGenerationCompleted";
}
