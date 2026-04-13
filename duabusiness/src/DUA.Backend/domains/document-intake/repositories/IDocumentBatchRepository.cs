using DUA.Backend.Domains.DocumentIntake.Models;

namespace DUA.Backend.Domains.DocumentIntake.Repositories;

public interface IDocumentBatchRepository
{
    Task<IReadOnlyCollection<DocumentBatch>> ListAsync(CancellationToken cancellationToken = default);
}
