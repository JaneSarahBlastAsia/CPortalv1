using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities
{
    public class NotificationPreference
    {
        [Key]
        public int NotificationPreferenceId { get; set; }

        public bool EmailEnabled { get; set; }
        public bool SmsEnabled { get; set; }

        // Foreign key
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}