using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//Add OCELOT configs
builder.Host.ConfigureAppConfiguration((hostingContext, config) => {
    config.AddJsonFile($"ocelot.json");
});



// Add services to the container.

//builder.Services.AddControllers();



//JWT
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SuperPorotoPassword2022$26283032"));
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateAudience = false,
            ValidateIssuer = false,//Test mode =false
        };
    });

builder.Services.AddOcelot();//API GW

var app = builder.Build();


// Configure the HTTP request pipeline.

app.UseRouting();
//add cors
app.UseAuthentication();//4 JWT

//// Map Okta scp to scope claims instead of http://schemas.microsoft.com/identity/claims/scope to allow ocelot to read/verify them
//JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("scp");
//JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Add("scp", "scope");

app.UseAuthorization();

app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
//app.MapControllers();

await app.UseOcelot();//Api GW

app.Run();
