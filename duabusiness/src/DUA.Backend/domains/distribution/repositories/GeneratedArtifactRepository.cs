using DUA.Backend.Domains.Distribution.Models;

namespace DUA.Backend.Domains.Distribution.Repositories;

public sealed class GeneratedArtifactRepository : IGeneratedArtifactRepository
{
    public Task<GeneratedArtifact?> GetByArtifactIdAsync(Guid artifactId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();

    public Task<GeneratedArtifact?> GetByGenerationJobIdAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
