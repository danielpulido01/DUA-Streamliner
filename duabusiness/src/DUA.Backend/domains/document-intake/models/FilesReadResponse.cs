namespace DUA.Backend.Domains.DocumentIntake.Models;

public sealed record FilesReadResponse(IReadOnlyCollection<DocumentBatch> DocumentBatches);
