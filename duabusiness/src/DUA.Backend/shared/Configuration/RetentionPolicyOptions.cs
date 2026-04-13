namespace DUA.Backend.Shared.Configuration;

public sealed class RetentionPolicyOptions
{
    public const string SectionName = "RetentionPolicy";

    public int HotStorageDays { get; set; }

    public string ArchiveContainer { get; set; } = string.Empty;
}
