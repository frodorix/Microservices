﻿using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Servicios.api.seguridad.Core.Application;
using Servicios.api.seguridad.Core.Dto;

namespace Servicios.api.seguridad.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {

        private readonly IMediator _mediator;

        public UsuarioController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioDto>> Registrar(Register.UsuarioRegisterCommand parametros) {
            return await _mediator.Send(parametros);
        }
    }
}