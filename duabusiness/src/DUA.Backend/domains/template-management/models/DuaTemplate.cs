namespace DUA.Backend.Domains.TemplateManagement.Models;

public sealed record DuaTemplate(
    Guid TemplateId,
    string TemplateName,
    string TemplateChannel,
    string Version,
    string Status,
    string BlobPath,
    DateTimeOffset UploadedAtUtc);
