using AutoMapper;
using WebAPI.Dto;
using WebAPI.Models;

namespace WebAPI.Profiles
{
    public class ProfileAutoMapper : Profile
    {
        public ProfileAutoMapper() {

            CreateMap<Projeto, ProjetoListarDto>();
        
        }
    }
}
