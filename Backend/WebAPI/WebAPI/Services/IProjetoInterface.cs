using WebAPI.Dto;
using WebAPI.Models;

namespace WebAPI.Services
{
    public interface IProjetoInterface
    {


        Task<ResponseModel<List<Projeto>>> BuscarProjetos();
        Task<ResponseModel<ProjetoListarDto>> BuscarProjetoPorId(int projetoId);
        Task<ResponseModel<List<ProjetoListarDto>>> CriarProjeto(ProjetoListarDto projetoListarDto);
        Task<ResponseModel<List<ProjetoListarDto>>> EditarProjeto(Projeto projeto, int projetoId);
        Task<ResponseModel<List<ProjetoListarDto>>> RemoverProjeto(int projetoId);

    }
}
