using DUA.Backend.Domains.Distribution.Models;

namespace DUA.Backend.Domains.Distribution.Services;

public interface IDistributionService
{
    Task<PreviewDuaResponse?> PreviewAsync(Guid generationJobId, CancellationToken cancellationToken = default);

    Task<DownloadDuaResponse?> DownloadAsync(Guid artifactId, CancellationToken cancellationToken = default);
}
