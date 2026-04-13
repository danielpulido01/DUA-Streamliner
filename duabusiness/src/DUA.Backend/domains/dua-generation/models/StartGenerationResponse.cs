namespace DUA.Backend.Domains.DuaGeneration.Models;

public sealed record StartGenerationResponse(Guid GenerationJobId, string Status);
