using DUA.Backend.Domains.TemplateManagement.Models;
using DUA.Backend.Domains.TemplateManagement.Repositories;

namespace DUA.Backend.Domains.TemplateManagement.Services;

public sealed class TemplateManagementService(IDuaTemplateRepository duaTemplateRepository) : ITemplateManagementService
{
    public Task<DuaTemplate?> GetAsync(Guid templateId, CancellationToken cancellationToken = default)
        => duaTemplateRepository.GetAsync(templateId, cancellationToken);

    public Task<UploadTemplateResponse> UploadAsync(UploadTemplateRequest request, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();

    public Task<TemplateValidationResponse> ValidateAsync(TemplateValidationRequest request, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
