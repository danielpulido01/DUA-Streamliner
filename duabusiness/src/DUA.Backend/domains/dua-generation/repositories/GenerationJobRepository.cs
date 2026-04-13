using DUA.Backend.Domains.DuaGeneration.Models;

namespace DUA.Backend.Domains.DuaGeneration.Repositories;

public sealed class GenerationJobRepository : IGenerationJobRepository
{
    public Task<GenerationErrorsResponse> GetErrorsAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();

    public Task<GenerationProgressReadModel?> GetProgressAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
