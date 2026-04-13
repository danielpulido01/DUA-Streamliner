using DUA.Backend.Domains.Distribution.Models;

namespace DUA.Backend.Domains.Distribution.Repositories;

public interface IGeneratedArtifactRepository
{
    Task<GeneratedArtifact?> GetByGenerationJobIdAsync(Guid generationJobId, CancellationToken cancellationToken = default);

    Task<GeneratedArtifact?> GetByArtifactIdAsync(Guid artifactId, CancellationToken cancellationToken = default);
}
