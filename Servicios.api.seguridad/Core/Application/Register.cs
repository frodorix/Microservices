using MediatR;
using Servicios.api.seguridad.Core.Dto;

namespace Servicios.api.seguridad.Core.Application
{
    public class Register
    {
        public class UusarioRegisterCommand : IRequest<UsuarioDto>
        {
            public string Nombre { get; set; }
            public string Apellido { get; set; }
            public string Username { set; get; }
            public string Email { get; set; }   
            public string Password { get; set; }    


        }
    }
}