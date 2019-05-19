using System;
using System.ComponentModel.DataAnnotations;

namespace Cretovale_api.Models
{
    public class Link : IEntity
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}