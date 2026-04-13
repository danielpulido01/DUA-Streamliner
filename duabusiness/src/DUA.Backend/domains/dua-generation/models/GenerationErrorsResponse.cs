namespace DUA.Backend.Domains.DuaGeneration.Models;

public sealed record GenerationErrorsResponse(Guid GenerationJobId, IReadOnlyCollection<GenerationErrorItem> Errors);
