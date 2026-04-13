namespace DUA.Backend.Shared.Configuration;

public sealed class AzureSqlOptions
{
    public const string SectionName = "AzureSql";

    public string ConnectionString { get; set; } = string.Empty;
}
