namespace DUA.Backend.Domains.DuaGeneration.Models;

public sealed record StartGenerationRequest(Guid GenerationSessionId, Guid DocumentBatchId, Guid TemplateId);
