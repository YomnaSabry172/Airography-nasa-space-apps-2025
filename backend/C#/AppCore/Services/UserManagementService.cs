using AppCore.DTOs;
using Domain.Entities.Users;
using Infrastructure.Interfaces;

namespace AppCore.Services
{
    public class UserManagementService
    {
        IRepository<User, Guid> usersRepository;
        public UserManagementService(IRepository<User, Guid> _usersRepository)
        {
            usersRepository = _usersRepository;
        }
        public async Task AddUserAsync(AddUserRequestDTO addUserRequestDTO)
        {
            User user = new User
            {
                Name = addUserRequestDTO.Name,
                Address = addUserRequestDTO.Address,
                City = addUserRequestDTO.City,
                Country = addUserRequestDTO.Country,
                Phone = addUserRequestDTO.Phone,
                Descriptor = addUserRequestDTO.Descriptor,
                MedicalCondition = addUserRequestDTO.MedicalCondition
            };
        }
    }
}
