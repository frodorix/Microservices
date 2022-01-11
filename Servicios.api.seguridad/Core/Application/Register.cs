using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Servicios.api.seguridad.Core.Dto;
using Servicios.api.seguridad.Core.Entities;
using Servicios.api.seguridad.Core.Persistence;

namespace Servicios.api.seguridad.Core.Application
{
    public class Register
    {
        public class UsuarioRegisterCommand : IRequest<UsuarioDto>
        {
            public string Nombre { get; set; }
            public string Apellido { get; set; }
            public string Username { set; get; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Direccion { get; set; }
        }
        public class UsuarioRegisterHandler : IRequestHandler<UsuarioRegisterCommand, UsuarioDto>
        {
            private readonly SeguridadContexto _context;
            private readonly UserManager<Usuario> _userManager;
            private readonly IMapper _mapper;

            public UsuarioRegisterHandler(SeguridadContexto context, UserManager<Usuario> userManager, IMapper mapper)
            {
                this._context = context;
                this._userManager = userManager;
                this._mapper = mapper;
            }
            public async Task<UsuarioDto> Handle(UsuarioRegisterCommand request, CancellationToken cancellationToken)
            {
                var existe = await _context.Users.Where(x => x.Email == request.Email).AnyAsync();
                if (existe)
                {
                    throw new Exception("El Email del usuario ya existe en la base de datos");
                }

                existe = await _context.Users.Where(x => x.UserName == request.Username).AnyAsync();
                if (existe)
                {
                    throw new Exception("El username del usuario ya existe en la base de datos");
                }

                var usuario = new Usuario
                {
                    Nombre = request.Nombre,
                    Apellido = request.Apellido,
                    Email = request.Email,
                    UserName = request.Username,
                    Direccion=request.Direccion,
                };

                var resultado = await _userManager.CreateAsync(usuario, request.Password);
                if (resultado.Succeeded)
                {
                    var usuarioDTO =_mapper.Map<Usuario, UsuarioDto>(usuario);
                    return usuarioDTO;
                }
                throw new Exception("No se pudo registrar el usuario");
            }
        }

    }
}