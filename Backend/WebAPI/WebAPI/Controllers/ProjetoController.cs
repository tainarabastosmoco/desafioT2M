using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dto;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjetoController : ControllerBase
    {

        private readonly IProjetoInterface _projetoInterface;
        public ProjetoController(IProjetoInterface projetoInterface)
        {

            _projetoInterface = projetoInterface;


        }

        [HttpGet]
        public async Task<IActionResult> BucarProjetos()
        {
            var projeto = await _projetoInterface.BuscarProjetos();

            if (projeto.Status == false)
            {
                return NotFound(projeto);
            }

            return Ok(projeto);
        }

        [HttpGet("{projetoId}")]
        public async Task<IActionResult> BucarProjetoPorId(int projetoId)
        {
            var projeto = await _projetoInterface.BuscarProjetoPorId(projetoId);

            if (projeto.Status == false)
            {
                return NotFound(projeto);
            }

            return Ok(projeto);
        }

        [HttpPost]

        public async Task<IActionResult> CriarProjeto(ProjetoListarDto projetoListarDto)
        {
            var projeto = await _projetoInterface.CriarProjeto(projetoListarDto);

            if (projeto.Status == false)
            {
                return BadRequest(projeto);
            }

            return Ok(projeto);
        }


        [HttpPut("{projetoId}")]
        public async Task<IActionResult> EditarProjeto(Projeto projeto, int projetoId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (projeto == null)
            {
                return BadRequest("O objeto projeto não pode ser nulo.");
            }

            var response = await _projetoInterface.EditarProjeto(projeto, projetoId);

            if (!response.Status)
            {
                return BadRequest(new { Mensagem = response.Mensagem });
            }

            return Ok(response);
        }


        [HttpDelete("{projetoId}")]

        public async Task<IActionResult> RemoverProjeto(int projetoId)
        {
            var projeto = await _projetoInterface.RemoverProjeto(projetoId);

            if (projeto.Status == false)
            {
                return BadRequest(projeto);
            }

            return Ok(projeto);
        }

    }
}
