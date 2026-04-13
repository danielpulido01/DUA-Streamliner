using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Domains.DocumentIntake.Models;

public sealed record FilesUploadStartedEvent(Guid DocumentBatchId, DateTimeOffset OccurredAtUtc) : IDomainEvent
{
    public string EventName => "FilesUploadStarted";
}
