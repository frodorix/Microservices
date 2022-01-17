using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//Add OCELOT configs
builder.Host.ConfigureAppConfiguration((hostingContext, config) => {
    config.AddJsonFile($"ocelot.json");
});

//JWT
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SuperPorotoPassword2022$"));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateAudience = true,
            ValidateIssuer = false,//Test mode
        };
    });

// Add services to the container.

//builder.Services.AddControllers();

builder.Services.AddOcelot();//API GW

var app = builder.Build();

app.UseAuthentication();//4 JWT

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

await app.UseOcelot();//Api GW


app.Run();
