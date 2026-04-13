using DUA.Backend.Domains.Distribution.Models;
using DUA.Backend.Domains.Distribution.Repositories;

namespace DUA.Backend.Domains.Distribution.Services;

public sealed class DistributionService : IDistributionService
{
    public DistributionService(IGeneratedArtifactRepository generatedArtifactRepository)
    {
        ArgumentNullException.ThrowIfNull(generatedArtifactRepository);
    }

    public Task<DownloadDuaResponse?> DownloadAsync(Guid artifactId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();

    public Task<PreviewDuaResponse?> PreviewAsync(Guid generationJobId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
