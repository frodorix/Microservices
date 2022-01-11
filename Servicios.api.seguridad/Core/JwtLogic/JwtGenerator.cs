using Microsoft.IdentityModel.Tokens;
using Servicios.api.seguridad.Core.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Servicios.api.seguridad.Core.JwtLogic
{
    public class JwtGenerator : IJwtGenerator
    {
        public string GenerateJwtToken(Usuario  usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, usuario.Id),
                new Claim("nombre", usuario.Nombre),
                new Claim("apellido", usuario.Apellido),

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SuperPorotoPassword2022$"));

            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credential
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token =  tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}
