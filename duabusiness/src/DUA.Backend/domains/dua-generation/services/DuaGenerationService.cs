using DUA.Backend.Domains.DuaGeneration.Models;
using DUA.Backend.Domains.DuaGeneration.Repositories;

namespace DUA.Backend.Domains.DuaGeneration.Services;

public sealed class DuaGenerationService(IGenerationJobRepository generationJobRepository) : IDuaGenerationService
{
    public Task<GenerationErrorsResponse> GetErrorsAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => generationJobRepository.GetErrorsAsync(generationJobId, cancellationToken);

    public Task<GenerationProgressReadModel?> GetProgressAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => generationJobRepository.GetProgressAsync(generationJobId, cancellationToken);

    public Task<GenerationProgressReadModel?> RefreshAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => generationJobRepository.GetProgressAsync(generationJobId, cancellationToken);

    public Task<StartGenerationResponse> StartAsync(StartGenerationRequest request, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
