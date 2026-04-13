using DUA.Backend.Domains.DocumentIntake.Models;
using DUA.Backend.Domains.DocumentIntake.Repositories;

namespace DUA.Backend.Domains.DocumentIntake.Services;

public sealed class DocumentIntakeService(IDocumentBatchRepository documentBatchRepository) : IDocumentIntakeService
{
    public Task<DeleteFileResponse> DeleteAsync(Guid sourceDocumentId, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();

    public async Task<FilesReadResponse> ReadAsync(CancellationToken cancellationToken = default)
    {
        var batches = await documentBatchRepository.ListAsync(cancellationToken);
        return new FilesReadResponse(batches);
    }

    public Task<UploadFilesResponse> UploadAsync(UploadFilesRequest request, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
