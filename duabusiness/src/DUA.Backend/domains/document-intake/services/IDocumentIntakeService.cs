using DUA.Backend.Domains.DocumentIntake.Models;

namespace DUA.Backend.Domains.DocumentIntake.Services;

public interface IDocumentIntakeService
{
    Task<FilesReadResponse> ReadAsync(CancellationToken cancellationToken = default);

    Task<UploadFilesResponse> UploadAsync(UploadFilesRequest request, CancellationToken cancellationToken = default);

    Task<DeleteFileResponse> DeleteAsync(Guid sourceDocumentId, CancellationToken cancellationToken = default);
}
