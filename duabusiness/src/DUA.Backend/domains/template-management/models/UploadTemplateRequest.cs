namespace DUA.Backend.Domains.TemplateManagement.Models;

public sealed record UploadTemplateRequest(string TemplateName, string Channel, string Version);
