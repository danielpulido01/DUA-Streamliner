using DUA.Backend.Shared.Configuration;
using Microsoft.Extensions.Options;

namespace DUA.Backend.Shared.Infrastructure;

public interface IAzureSqlConnectionFactory
{
    string GetConfiguredConnectionString();
}

public sealed class AzureSqlConnectionFactory(IOptions<AzureSqlOptions> options) : IAzureSqlConnectionFactory
{
    public string GetConfiguredConnectionString() => options.Value.ConnectionString;
}
