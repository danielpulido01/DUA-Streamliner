using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Domains.Distribution.Models;

public sealed record ArtifactDownloadedEvent(Guid ArtifactId, DateTimeOffset OccurredAtUtc) : IDomainEvent
{
    public string EventName => "ArtifactDownloaded";
}
