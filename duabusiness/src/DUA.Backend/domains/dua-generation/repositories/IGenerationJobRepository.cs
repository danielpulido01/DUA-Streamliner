using DUA.Backend.Domains.DuaGeneration.Models;

namespace DUA.Backend.Domains.DuaGeneration.Repositories;

public interface IGenerationJobRepository
{
    Task<GenerationProgressReadModel?> GetProgressAsync(Guid generationJobId, CancellationToken cancellationToken = default);

    Task<GenerationErrorsResponse> GetErrorsAsync(Guid generationJobId, CancellationToken cancellationToken = default);
}
