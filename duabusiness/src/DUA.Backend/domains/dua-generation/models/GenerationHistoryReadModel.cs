namespace DUA.Backend.Domains.DuaGeneration.Models;

public sealed record GenerationHistoryReadModel(
    Guid GenerationJobId,
    Guid GenerationSessionId,
    string Status,
    DateTimeOffset RequestedAtUtc);
