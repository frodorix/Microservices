using Servicios.api.Libreria.Core.Entities;

namespace Servicios.api.Libreria.Repository
{
    public interface IMongoRepository<TDocument> where TDocument : IDocument
    {
        Task<IEnumerable<TDocument>>  GetAll();
        Task<TDocument> GetById(string id);
        Task InsertDocument(TDocument document);
        Task UpdateDocument(TDocument document);

        Task DeleteById(string id);


    }
}
