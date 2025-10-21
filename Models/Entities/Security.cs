using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities
{
    public class Security
    {
        [Key]
        public int SecurityId { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public bool TwoFactorEnabled { get; set; }

        // Foreign key
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}