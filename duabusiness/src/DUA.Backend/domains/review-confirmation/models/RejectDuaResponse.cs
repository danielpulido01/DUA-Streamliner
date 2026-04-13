namespace DUA.Backend.Domains.ReviewConfirmation.Models;

public sealed record RejectDuaResponse(Guid ReviewCaseId, string Status);
