using Servicios.api.Libreria.Core;
using Servicios.api.Libreria.Core.ContextMongoDB;
using Servicios.api.Libreria.Repository;

var builder = WebApplication.CreateBuilder(args);

//Begin adding my mongoDB settings
builder.Services.Configure<MongoSettings>(options => { 
     options.ConnectionString = builder.Configuration.GetSection("MongoDB:ConnectionString").Value;
     options.Database= builder.Configuration.GetSection("MongoDB:Database").Value;
});
builder.Services.AddSingleton<MongoSettings>();
//END
//Add mycontext
builder.Services.AddTransient<IAutorContext, AutorContext>();

//Add Repo
builder.Services.AddTransient<IAutorRepository, AutorRepository>();
builder.Services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>)) ;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
