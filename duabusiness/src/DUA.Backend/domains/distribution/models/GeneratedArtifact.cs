namespace DUA.Backend.Domains.Distribution.Models;

public sealed record GeneratedArtifact(Guid ArtifactId, Guid GenerationJobId, string Status, string DownloadPath);
