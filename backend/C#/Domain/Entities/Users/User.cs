using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Users
{
    public class User : BaseEntity<Guid>
    {
        public enum Descriptors
        {
            Patient,
            Farmer,
            IndustrialZoneResident,
            Researcher,
            General
        }

        public enum MedicalConditions
        {
            Asthma,
            LungCancer,
            Bronchitis,
            COPD,
            Other
        }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public required string Phone { get; set; }
        public required string EmailAddress { get; set; }
        public required string HashedPassword { get; set; }
        public required Descriptors Descriptor { get; set; }
        public MedicalConditions MedicalCondition { get; set; }

    }
}
