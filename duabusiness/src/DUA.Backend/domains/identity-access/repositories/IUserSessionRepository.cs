using DUA.Backend.Domains.IdentityAccess.Models;

namespace DUA.Backend.Domains.IdentityAccess.Repositories;

public interface IUserSessionRepository
{
    Task<UserSession?> GetCurrentSessionAsync(CancellationToken cancellationToken = default);
}
