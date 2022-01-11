using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Servicios.api.seguridad.Core.Dto;
using Servicios.api.seguridad.Core.Entities;
using Servicios.api.seguridad.Core.JwtLogic;

namespace Servicios.api.seguridad.Core.Application
{
    public class UsuarioActual
    {
        public class UsuarioActualCommand: IRequest<UsuarioDto> { 
        }

        public class UsuarioActualHandler : IRequestHandler<UsuarioActualCommand, UsuarioDto>
        {
            private readonly UserManager<Usuario> _userManager;
            private readonly IUsuarioSesion _usuarioSession;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IMapper _mapper;
            public UsuarioActualHandler(IMapper mapper, UserManager<Usuario> userManager,  IJwtGenerator jwtGenerator, IUsuarioSesion usuarioSession)
            {
                this._userManager = userManager;
                this._jwtGenerator = jwtGenerator;
               this._usuarioSession = usuarioSession;
                this._mapper = mapper;
            }
            public async Task<UsuarioDto> Handle(UsuarioActualCommand request, CancellationToken cancellationToken)
            {
                var usuario = await _userManager.FindByNameAsync(_usuarioSession.GetUsuarioSesion());

                if(usuario != null)
                {
                    var usuarioDto = _mapper.Map<Usuario,UsuarioDto>(usuario);
                    usuarioDto.Token = _jwtGenerator.GenerateJwtToken(usuario);
                    return usuarioDto;
                }
                throw new Exception("No se encontró el usuario");
            }

        }
    }
}
