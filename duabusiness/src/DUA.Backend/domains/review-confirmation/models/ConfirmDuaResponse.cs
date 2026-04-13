namespace DUA.Backend.Domains.ReviewConfirmation.Models;

public sealed record ConfirmDuaResponse(Guid ReviewCaseId, string Status);
