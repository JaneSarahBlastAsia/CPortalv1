using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }

        [MaxLength(200)]
        public string AddressLine1 { get; set; }

        [MaxLength(200)]
        public string AddressLine2 { get; set; }

        [MaxLength(100)]
        public string City { get; set; }

        [MaxLength(100)]
        public string State { get; set; }

        [MaxLength(20)]
        public string ZipCode { get; set; }

        [MaxLength(100)]
        public string Country { get; set; }

        // Foreign key
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}