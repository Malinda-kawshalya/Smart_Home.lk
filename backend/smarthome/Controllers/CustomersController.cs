using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace.Models
{
    [Table("CUSTOMER")]
    public class Customer
    {
        [Key]
        [Column("customer_id")]
        public int CustomerId { get; set; }

        [Column("customer_name")]
        public string CustomerName { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("phone")]
        public string Phone { get; set; }

        [Column("location_id")]
        public int? LocationId { get; set; }

        [Column("customer_type_id")]
        public int? CustomerTypeId { get; set; }

        [Column("registration_date")]
        public DateTime? RegistrationDate { get; set; }

        [Column("loyalty_points")]
        public int? LoyaltyPoints { get; set; }
    }
}
