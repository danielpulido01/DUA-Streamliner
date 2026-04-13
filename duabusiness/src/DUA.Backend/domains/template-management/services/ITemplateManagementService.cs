using DUA.Backend.Domains.TemplateManagement.Models;

namespace DUA.Backend.Domains.TemplateManagement.Services;

public interface ITemplateManagementService
{
    Task<UploadTemplateResponse> UploadAsync(UploadTemplateRequest request, CancellationToken cancellationToken = default);

    Task<TemplateValidationResponse> ValidateAsync(TemplateValidationRequest request, CancellationToken cancellationToken = default);

    Task<DuaTemplate?> GetAsync(Guid templateId, CancellationToken cancellationToken = default);
}
