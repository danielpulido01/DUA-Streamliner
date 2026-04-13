namespace DUA.Backend.Domains.DuaGeneration.Models;

public sealed record DuaDraft(Guid DuaDraftId, Guid GenerationJobId, string Status, string ArtifactPath);
