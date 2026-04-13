using DUA.Backend.Acls.DocumentIntakeToDuaGeneration;
using DUA.Backend.Acls.DuaGenerationToReviewConfirmation;
using DUA.Backend.Acls.ReviewConfirmationToDistribution;
using DUA.Backend.Acls.TemplateManagementToDuaGeneration;
using DUA.Backend.Domains.AuditObservability.Repositories;
using DUA.Backend.Domains.AuditObservability.Services;
using DUA.Backend.Domains.Distribution.Repositories;
using DUA.Backend.Domains.Distribution.Services;
using DUA.Backend.Domains.DocumentIntake.Repositories;
using DUA.Backend.Domains.DocumentIntake.Services;
using DUA.Backend.Domains.DuaGeneration.Repositories;
using DUA.Backend.Domains.DuaGeneration.Services;
using DUA.Backend.Domains.IdentityAccess.Repositories;
using DUA.Backend.Domains.IdentityAccess.Services;
using DUA.Backend.Domains.RetentionArchival.Repositories;
using DUA.Backend.Domains.RetentionArchival.Services;
using DUA.Backend.Domains.ReviewConfirmation.Repositories;
using DUA.Backend.Domains.ReviewConfirmation.Services;
using DUA.Backend.Domains.TemplateManagement.Repositories;
using DUA.Backend.Domains.TemplateManagement.Services;
using DUA.Backend.Shared.Abstractions;
using DUA.Backend.Shared.Configuration;
using DUA.Backend.Shared.Infrastructure;

namespace DUA.Backend.Composition;

public static class BackendServiceCollectionExtensions
{
    public static IServiceCollection AddBackendOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<AzureSqlOptions>(configuration.GetSection(AzureSqlOptions.SectionName));
        services.Configure<BlobStorageOptions>(configuration.GetSection(BlobStorageOptions.SectionName));
        services.Configure<NotificationHubOptions>(configuration.GetSection(NotificationHubOptions.SectionName));
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.Configure<RetentionPolicyOptions>(configuration.GetSection(RetentionPolicyOptions.SectionName));

        return services;
    }

    public static IServiceCollection AddBackendModules(this IServiceCollection services)
    {
        services.AddSingleton<IAzureSqlConnectionFactory, AzureSqlConnectionFactory>();
        services.AddSingleton<IAzureBlobClientFactory, AzureBlobClientFactory>();
        services.AddSingleton<INotificationHubClientFactory, NotificationHubClientFactory>();

        services.AddScoped<IUnitOfWork, StubUnitOfWork>();
        services.AddScoped<IOutboxPublisher, StubOutboxPublisher>();

        services.AddScoped<IUserSessionRepository, UserSessionRepository>();
        services.AddScoped<IIdentityAccessService, IdentityAccessService>();

        services.AddScoped<IDocumentBatchRepository, DocumentBatchRepository>();
        services.AddScoped<IDocumentIntakeService, DocumentIntakeService>();

        services.AddScoped<IDuaTemplateRepository, DuaTemplateRepository>();
        services.AddScoped<ITemplateManagementService, TemplateManagementService>();

        services.AddScoped<IGenerationJobRepository, GenerationJobRepository>();
        services.AddScoped<IDuaGenerationService, DuaGenerationService>();

        services.AddScoped<IReviewCaseRepository, ReviewCaseRepository>();
        services.AddScoped<IReviewConfirmationService, ReviewConfirmationService>();

        services.AddScoped<IGeneratedArtifactRepository, GeneratedArtifactRepository>();
        services.AddScoped<IDistributionService, DistributionService>();

        services.AddScoped<IRetentionRecordRepository, RetentionRecordRepository>();
        services.AddScoped<IRetentionArchivalService, RetentionArchivalService>();

        services.AddScoped<IAuditEntryRepository, AuditEntryRepository>();
        services.AddScoped<IAuditObservabilityService, AuditObservabilityService>();

        services.AddScoped<IDocumentIntakeToDuaGenerationFacade, DocumentIntakeToDuaGenerationFacade>();
        services.AddScoped<ITemplateManagementToDuaGenerationFacade, TemplateManagementToDuaGenerationFacade>();
        services.AddScoped<IDuaGenerationToReviewConfirmationFacade, DuaGenerationToReviewConfirmationFacade>();
        services.AddScoped<IReviewConfirmationToDistributionFacade, ReviewConfirmationToDistributionFacade>();

        return services;
    }
}
