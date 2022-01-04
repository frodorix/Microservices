using AutoMapper;

namespace Servicios.api.seguridad.Core.Dto
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<UsuarioDto, UsuarioDto>();
        }
    }
}
