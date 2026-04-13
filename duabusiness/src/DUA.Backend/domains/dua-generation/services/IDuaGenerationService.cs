using DUA.Backend.Domains.DuaGeneration.Models;

namespace DUA.Backend.Domains.DuaGeneration.Services;

public interface IDuaGenerationService
{
    Task<StartGenerationResponse> StartAsync(StartGenerationRequest request, CancellationToken cancellationToken = default);

    Task<GenerationProgressReadModel?> GetProgressAsync(Guid generationJobId, CancellationToken cancellationToken = default);

    Task<GenerationProgressReadModel?> RefreshAsync(Guid generationJobId, CancellationToken cancellationToken = default);

    Task<GenerationErrorsResponse> GetErrorsAsync(Guid generationJobId, CancellationToken cancellationToken = default);
}
