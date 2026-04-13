using DUA.Backend.Domains.IdentityAccess.Models;
using DUA.Backend.Domains.IdentityAccess.Repositories;

namespace DUA.Backend.Domains.IdentityAccess.Services;

public sealed class IdentityAccessService(IUserSessionRepository userSessionRepository) : IIdentityAccessService
{
    public Task<UserSession?> GetCurrentSessionAsync(CancellationToken cancellationToken = default)
        => userSessionRepository.GetCurrentSessionAsync(cancellationToken);

    public Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();

    public Task LogoutAsync(LogoutRequest request, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();
}
