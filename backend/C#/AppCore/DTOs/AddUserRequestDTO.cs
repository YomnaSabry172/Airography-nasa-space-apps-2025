using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Entities.Users.User;

namespace AppCore.DTOs
{
    public class AddUserRequestDTO
    {
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public required string Phone { get; set; }
        public required Descriptors Descriptor { get; set; }
        public MedicalConditions MedicalCondition { get; set; }
    }
}
