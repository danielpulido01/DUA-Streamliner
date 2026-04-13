using DUA.Backend.Shared.Infrastructure;

namespace DUA.Backend.Shared.Abstractions;

public interface IOutboxPublisher
{
    Task QueueAsync(OutboxMessage message, CancellationToken cancellationToken = default);
}
