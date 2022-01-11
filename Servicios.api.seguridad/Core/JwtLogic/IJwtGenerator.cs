using Servicios.api.seguridad.Core.Entities;

namespace Servicios.api.seguridad.Core.JwtLogic
{
    public interface IJwtGenerator
    {
        string GenerateJwtToken(Usuario usuario);
    }
}
