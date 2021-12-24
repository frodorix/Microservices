using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Servicios.api.Libreria.Core.Entities;
using Servicios.api.Libreria.Repository;

namespace Servicios.api.Libreria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private readonly IMongoRepository<LibroEntity> _libroRepository;
        public LibroController(IMongoRepository<LibroEntity> mongoRepository)
        {
            _libroRepository = mongoRepository;
        }

        [HttpPost]
        public async Task Post(LibroEntity entity)
        {
            await _libroRepository.InsertDocument(entity);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LibroEntity>>> Get(){
            return Ok(await _libroRepository.GetAll());
        }

        [HttpPost("pagination")]
        public async Task<ActionResult<PaginationEntity<LibroEntity>>> PostPagination(PaginationEntity<LibroEntity> pagination)
        {
            var resultado = await _libroRepository.PaginationByFilter(pagination);
            return Ok(resultado);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LibroEntity>> GetById(string id)
        {
            var libro = await _libroRepository.GetById(id);
            return Ok(libro);
        }


    }
}
