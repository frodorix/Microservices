﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Servicios.api.seguridad.Core.Entities;

namespace Servicios.api.seguridad.Core.Persistence
{
    public class SeguridadContexto : IdentityDbContext<Usuario>
    {
        public SeguridadContexto(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
