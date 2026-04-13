namespace DUA.Backend.Domains.ReviewConfirmation.Models;

public sealed record ReviewCase(Guid ReviewCaseId, Guid GenerationJobId, string Status, string ReviewerNotes);
