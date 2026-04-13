namespace DUA.Backend.Domains.DuaGeneration.Models;

public interface IDocumentProcessorStrategy
{
    string StrategyName { get; }

    Task ProcessAsync(Guid generationJobId, CancellationToken cancellationToken = default);
}
