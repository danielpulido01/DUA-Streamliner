using DUA.Backend.Domains.IdentityAccess.Models;

namespace DUA.Backend.Domains.IdentityAccess.Services;

public interface IIdentityAccessService
{
    Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);

    Task LogoutAsync(LogoutRequest request, CancellationToken cancellationToken = default);

    Task<UserSession?> GetCurrentSessionAsync(CancellationToken cancellationToken = default);
}
