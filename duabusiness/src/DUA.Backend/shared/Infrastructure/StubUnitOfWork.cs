using DUA.Backend.Shared.Abstractions;

namespace DUA.Backend.Shared.Infrastructure;

public sealed class StubUnitOfWork : IUnitOfWork
{
    public Task CommitAsync(CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
