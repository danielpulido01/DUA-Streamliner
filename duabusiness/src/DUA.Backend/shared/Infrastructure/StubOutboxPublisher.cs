using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Shared.Infrastructure;

public sealed class StubOutboxPublisher : IOutboxPublisher
{
    public Task QueueAsync(OutboxMessage message, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
