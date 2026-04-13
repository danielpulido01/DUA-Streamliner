namespace DUA.Backend.Domains.Distribution.Models;

public sealed record DownloadDuaResponse(Guid ArtifactId, string DownloadUrl, string FileName);
