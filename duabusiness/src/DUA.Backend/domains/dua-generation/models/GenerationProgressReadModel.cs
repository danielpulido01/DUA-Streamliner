namespace DUA.Backend.Domains.DuaGeneration.Models;

public sealed record GenerationProgressReadModel(
    Guid GenerationJobId,
    string Status,
    int ProgressPercentage,
    string CurrentStep,
    DateTimeOffset LastTransitionAtUtc);
