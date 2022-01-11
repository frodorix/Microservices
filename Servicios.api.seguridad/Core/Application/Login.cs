using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Servicios.api.seguridad.Core.Dto;
using Servicios.api.seguridad.Core.Entities;
using Servicios.api.seguridad.Core.JwtLogic;
using Servicios.api.seguridad.Core.Persistence;

namespace Servicios.api.seguridad.Core.Application
{
    public class Login
    {
        public class UsuarioLiginCommand : IRequest<UsuarioDto>
        {
            public string Email { get; set; }
            public string Password { get; set; }    
        }

        public class UsuarioLoginValidation: AbstractValidator<UsuarioLiginCommand>
        {
            public UsuarioLoginValidation()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x=> x.Password).NotEmpty();
            }

        }

        public class UsuarioLoginHandler : IRequestHandler<UsuarioLiginCommand, UsuarioDto>
        {

            private readonly SeguridadContexto _context;
            private readonly UserManager<Usuario> _userManager;
            private readonly IMapper _mapper;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly SignInManager<Usuario> _signInManager;
            public UsuarioLoginHandler(SeguridadContexto context, UserManager<Usuario> userManager, IMapper mapper, IJwtGenerator jwtGenerator, SignInManager<Usuario> signInManager)
            {
                this._context = context;
                this._userManager = userManager;
                this._mapper = mapper;
                this._jwtGenerator = jwtGenerator;
                this._signInManager = signInManager;
            }
            public async Task<UsuarioDto> Handle(UsuarioLiginCommand request, CancellationToken cancellationToken)
            {
                var usuario = await _userManager.FindByEmailAsync(request.Email);
                if(usuario == null)
                {
                    throw new Exception("El usuario no existe");
                }

                var resultado = await _signInManager.CheckPasswordSignInAsync(usuario, request.Password, false);

                if (resultado.Succeeded)
                {
                    var dto = _mapper.Map<Usuario, UsuarioDto>(usuario);
                    dto.Token = _jwtGenerator.GenerateJwtToken(usuario);
                    return dto;
                }

                throw new Exception("Login Incorrect");
            }
        }
    }
}
