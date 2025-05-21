using System;
using System.ComponentModel.DataAnnotations;

namespace CustomerManagementAPI.DTOs
{
    public class CustomerDto
    {
        public int CustomerId { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public int LocationId { get; set; }

        [Required]
        public int CustomerTypeId { get; set; }

        [Required]
        public DateTime RegistrationDate { get; set; }

        [Required]
        public int LoyaltyPoints { get; set; }
    }

    public class CustomerCreateDto
    {
        [Required]
        public string CustomerName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public int LocationId { get; set; }

        [Required]
        public int CustomerTypeId { get; set; }

        [Required]
        public DateTime RegistrationDate { get; set; }

        [Required]
        public int LoyaltyPoints { get; set; }
    }

    public class CustomerUpdateDto
    {
        [Required]
        public string CustomerName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public int LocationId { get; set; }

        [Required]
        public int CustomerTypeId { get; set; }

        [Required]
        public DateTime RegistrationDate { get; set; }

        [Required]
        public int LoyaltyPoints { get; set; }
    }
}