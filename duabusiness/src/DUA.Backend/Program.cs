using DUA.Backend.Composition;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddBackendOptions(builder.Configuration)
    .AddBackendModules();

builder.Services.AddControllers();
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => Results.Redirect("/openapi/dua-backend.openapi.json"));

app.Run();
