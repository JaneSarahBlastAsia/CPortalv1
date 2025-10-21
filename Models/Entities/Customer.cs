using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(200)]
        public string Email { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        public DateTime? DateOfBirth { get; set; }

        // Navigation
        public Address Address { get; set; }
        public NotificationPreference NotificationPreference { get; set; }
        public Security Security { get; set; }
    }
}