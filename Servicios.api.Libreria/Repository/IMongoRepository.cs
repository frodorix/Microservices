using Servicios.api.Libreria.Core.Entities;

namespace Servicios.api.Libreria.Repository
{
    public interface IMongoRepository<TDocument> where TDocument : IDocument
    {
        Task<IEnumerable<TDocument>>  GetAll();

    }
}
