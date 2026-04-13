using DUA.Backend.Domains.IdentityAccess.Models;

namespace DUA.Backend.Domains.IdentityAccess.Repositories;

public sealed class UserSessionRepository : IUserSessionRepository
{
    public Task<UserSession?> GetCurrentSessionAsync(CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
