﻿namespace FastFoodApi.Models
{
    public class AppUser
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime Dob {  get; set; }
        public string ContactNo { get; set; } = string.Empty;
        public string? Email {  get; set; }
        public string? Username {  get; set; }
        public string? Password { get; set; }
        public string? Role {  get; set; }
    }
}
