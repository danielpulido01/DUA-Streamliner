namespace DUA.Backend.Domains.DuaGeneration.Models;

public abstract class BaseGenerationPipeline
{
    public virtual Task RunAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
