using AutoMapper;
using Servicios.api.seguridad.Core.Entities;

namespace Servicios.api.seguridad.Core.Dto
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Usuario, UsuarioDto>();
        }
    }
}
