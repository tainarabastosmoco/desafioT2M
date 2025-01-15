using AutoMapper;
using WebAPI.Dto;
using WebAPI.Models;
using System.Data.SqlClient;
using Dapper;
using System.Collections.Generic;


namespace WebAPI.Services
{
    public class ProjetoService : IProjetoInterface
    {

        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public ProjetoService(IConfiguration configuration, IMapper mapper)
        {
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<ResponseModel<ProjetoListarDto>> BuscarProjetoPorId(int projetoId)
        {

            ResponseModel<ProjetoListarDto> response = new ResponseModel<ProjetoListarDto>();

            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var projetoBanco = await connection.QueryFirstOrDefaultAsync<Projeto>("select * from Projeto where id = @Id", new { Id = projetoId });

                if (projetoBanco == null)
                {
                    response.Mensagem = "Nehum projeto localizado!";
                    response.Status = false;
                    return response;
                }

                var projetoMapeado = _mapper.Map<ProjetoListarDto>(projetoBanco);

                response.Dados = projetoMapeado;
                response.Mensagem = "Projeto localizado com sucesso!";

            }

            return response;
        }

        public async Task<ResponseModel<List<Projeto>>> BuscarProjetos()
        {
            ResponseModel<List<Projeto>> response = new ResponseModel<List<Projeto>>();

            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var projetoBanco = await connection.QueryAsync<Projeto>("select * from Projeto");

                if (projetoBanco.Count() == 0)

                {
                    response.Mensagem = "Nenhum projeto localizado!";
                    response.Status = false;
                    return response;
                }

                var projetoMapeado = _mapper.Map<List<Projeto>>(projetoBanco);

                response.Dados = projetoMapeado;
                response.Mensagem = "Projetos localizados com sucesso!";


            }

            return response;
        }

 
      public async Task<ResponseModel<List<ProjetoListarDto>>> CriarProjeto(ProjetoListarDto projetoListarDto)
        {
            ResponseModel<List<ProjetoListarDto>> response = new ResponseModel<List<ProjetoListarDto>>();

            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {

                var projetoBanco = await connection.ExecuteAsync("insert into Projeto (NomeDoProjeto, TarefasAssociadas, Prazos, Responsavel) values (@NomeDoProjeto, @TarefasAssociadas, @Prazos, @Responsavel)", projetoListarDto);

                if (projetoBanco == 0)

                {
                    response.Mensagem = "Ocorreu um erro ao realizar o registro!";
                    response.Status = false;
                    return response;
                }

                var projeto = await ListarProjetos(connection);

                var projetoMapeado = _mapper.Map<List<ProjetoListarDto>>(projeto);

                response.Dados = projetoMapeado;
                response.Mensagem = "Projetos listados com sucesso!";
            }

            return response;    
        }

        private static async Task<IEnumerable<Projeto>> ListarProjetos(SqlConnection connection)

        {
            return await connection.QueryAsync<Projeto>("select * from Projeto");

        }

        public async Task<ResponseModel<List<ProjetoListarDto>>> EditarProjeto(Projeto projeto, int projetoId)
        {
            var response = new ResponseModel<List<ProjetoListarDto>>();

            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                // Atualiza o projeto no banco de dados e verifica as linhas afetadas
                var linhasAfetadas = await connection.ExecuteAsync(
                    "UPDATE Projeto SET NomeDoProjeto = @NomeDoProjeto, TarefasAssociadas = @TarefasAssociadas, Prazos = @Prazos, Responsavel = @Responsavel WHERE Id = @Id",
                    new { projeto.NomeDoProjeto, projeto.TarefasAssociadas, projeto.Prazos, projeto.Responsavel, Id = projetoId }
                );

                if (linhasAfetadas == 0)
                {
                    response.Mensagem = "Ocorreu um erro ao realizar a edição!";
                    response.Status = false;
                    return response;
                }

                var projetos = await ListarProjetos(connection);

                // Mapeia para o DTO
                var projetosMapeados = _mapper.Map<List<ProjetoListarDto>>(projetos);

                response.Dados = projetosMapeados;
                response.Mensagem = "Projetos listados com sucesso!";
                response.Status = true;
            }

            return response;
        }


        public async Task<ResponseModel<List<ProjetoListarDto>>> RemoverProjeto(int projetoId)
        {
            ResponseModel<List<ProjetoListarDto>> response = new ResponseModel<List<ProjetoListarDto>>();

            using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var projetoBanco = await connection.ExecuteAsync("delete from Projeto where id =@Id", new { Id = projetoId });
                if (projetoBanco == 0)
                {
                    response.Mensagem = "Ocorreu um erro ao realizar a edição!";
                    response.Status = false;
                    return response;
                }

                var projeto = await ListarProjetos(connection);
                var projetosMapeados = _mapper.Map<List<ProjetoListarDto>>(projeto);
                response.Dados = projetosMapeados;  // Agora 'Dados' é uma lista de ProjetoListarDto
                response.Mensagem = "Projetos listados com sucesso!";

            }

            return response;
        }
    }
    }
