using Microsoft.AspNetCore.Identity;
using Servicios.api.seguridad.Core.Entities;

namespace Servicios.api.seguridad.Core.Persistence
{
    public class SeguridadData
    {
        public static async Task InsertarUsuario(SeguridadContexto context, UserManager<Usuario> usuarioManager)
        {
            if (!usuarioManager.Users.Any())
            {
                var usuario = new Usuario
                {
                    Nombre = "Edwin",
                    Apellido = "Rojas",
                    Direccion = "Heaven Roads 777",
                    UserName = "erojas",
                    Email = "edwin.frederick@gmail.com"
                };
                await usuarioManager.CreateAsync(usuario,"Password1979$");
            }
        }
    }
}
