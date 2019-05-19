using System;
using System.ComponentModel.DataAnnotations;

namespace Cretovale_api.Models
{
    public class Covenant : IEntity
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Site { get; set; }
        //benefit
        public string Benefict { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }

        [Required]
        public Company Company { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
