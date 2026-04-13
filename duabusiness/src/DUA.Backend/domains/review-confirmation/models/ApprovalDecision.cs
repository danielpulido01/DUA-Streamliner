namespace DUA.Backend.Domains.ReviewConfirmation.Models;

public sealed record ApprovalDecision(Guid ReviewCaseId, bool IsApproved, string Comments);
