using DUA.Backend.Shared.Configuration;
using Microsoft.Extensions.Options;

namespace DUA.Backend.Shared.Infrastructure;

public interface IAzureBlobClientFactory
{
    string GetConfiguredConnectionString();
}

public sealed class AzureBlobClientFactory(IOptions<BlobStorageOptions> options) : IAzureBlobClientFactory
{
    public string GetConfiguredConnectionString() => options.Value.ConnectionString;
}
