namespace DUA.Backend.Domains.DuaGeneration.Models;

public sealed record GenerationJob(
    Guid GenerationJobId,
    Guid GenerationSessionId,
    Guid DocumentBatchId,
    Guid TemplateId,
    string Status,
    int ProgressPercentage,
    string CurrentStep,
    DateTimeOffset LastTransitionAtUtc);
