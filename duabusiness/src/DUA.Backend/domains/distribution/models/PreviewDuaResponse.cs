namespace DUA.Backend.Domains.Distribution.Models;

public sealed record PreviewDuaResponse(Guid ArtifactId, string PreviewUrl, string Status);
