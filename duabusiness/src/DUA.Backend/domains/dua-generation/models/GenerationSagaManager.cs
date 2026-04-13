namespace DUA.Backend.Domains.DuaGeneration.Models;

public sealed class GenerationSagaManager
{
    public Task AdvanceAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
