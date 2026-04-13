namespace DUA.Backend.Domains.DocumentIntake.Models;

public sealed record DeleteFileResponse(Guid SourceDocumentId, string Status);
