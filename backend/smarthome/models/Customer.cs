using System;

namespace YourNamespace.Models
{
    public class Customer
    {
        public int Customer_Id { get; set; }
        public string Customer_Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Location_Id { get; set; }
        public string Customer_Type_Id { get; set; }
        public DateTime Registration_Date { get; set; }
        public int Loyalty_Points { get; set; }
    }
}
