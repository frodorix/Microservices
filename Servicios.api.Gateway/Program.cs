using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);



//Add OCELOT configs
builder.Host.ConfigureAppConfiguration((hostingContext, config) => {
    config.AddJsonFile($"ocelot.json");
});

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddOcelot();//API GW

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

await app.UseOcelot();//Api GW

app.Run();
