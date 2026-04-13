namespace DUA.Backend.Domains.DuaGeneration.Models;

public interface IPolicyValidationStrategy
{
    string StrategyName { get; }

    Task ValidateAsync(Guid generationJobId, CancellationToken cancellationToken = default);
}
