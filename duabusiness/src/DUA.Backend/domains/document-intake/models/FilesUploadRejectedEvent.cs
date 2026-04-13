using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Domains.DocumentIntake.Models;

public sealed record FilesUploadRejectedEvent(Guid DocumentBatchId, DateTimeOffset OccurredAtUtc) : IDomainEvent
{
    public string EventName => "FilesUploadRejected";
}
