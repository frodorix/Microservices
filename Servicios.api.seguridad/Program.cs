using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using Servicios.api.seguridad.Core.Application;
using Servicios.api.seguridad.Core.Entities;
using Servicios.api.seguridad.Core.JwtLogic;
using Servicios.api.seguridad.Core.Persistence;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<SeguridadContexto>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionDB"));
});

/// <summary>
/// Core Identity Configuration
/// </summary>
var icBuilder = builder.Services.AddIdentityCore<Usuario>();
var identityBuilder = new IdentityBuilder(icBuilder.UserType, icBuilder.Services);
identityBuilder.AddEntityFrameworkStores<SeguridadContexto>();
identityBuilder.AddSignInManager < SignInManager<Usuario>>();
builder.Services.TryAddSingleton<ISystemClock,SystemClock>();
//

//mediatR
builder.Services.AddMediatR(typeof(Register.UsuarioRegisterCommand).Assembly);
//add Mappers
builder.Services.AddAutoMapper(typeof(Register.UsuarioRegisterHandler));

builder.Services.AddScoped<IJwtGenerator,JwtGenerator>();
builder.Services.AddScoped<IUsuarioSesion, UsuarioSesion>();

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SuperPorotoPassword2022$"));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer( opt=>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = key,
        ValidateAudience = true,
        ValidateIssuer = false,//Test mode

    };
} );

// Add services to the container.

builder.Services.AddControllers();

//Validation
builder.Services.AddFluentValidation(x=> x.RegisterValidatorsFromAssemblyContaining<Register>());

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();


//Init Core Identity Register first user
using (var contexto = app.Services.CreateScope())
{
    var services = contexto.ServiceProvider;
    try
    {
        var userManager = services.GetRequiredService<UserManager<Usuario>>();
        var contextoEF = services.GetRequiredService<SeguridadContexto>();
        SeguridadData.InsertarUsuario(contextoEF,userManager).Wait();
    }
    catch (Exception e)
    {
        var logging = services.GetRequiredService<ILogger<Program>>();
        logging.LogError(e, "Error al registrar usuario");

    }
}



app.Run();
