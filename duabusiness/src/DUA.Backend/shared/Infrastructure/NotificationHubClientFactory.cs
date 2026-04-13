using DUA.Backend.Shared.Configuration;
using Microsoft.Extensions.Options;

namespace DUA.Backend.Shared.Infrastructure;

public interface INotificationHubClientFactory
{
    string GetHubName();
}

public sealed class NotificationHubClientFactory(IOptions<NotificationHubOptions> options) : INotificationHubClientFactory
{
    public string GetHubName() => options.Value.HubName;
}
