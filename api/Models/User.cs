using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cretovale_api.Models
{
  public class User : IEntity
  {
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }
    public string Password { get; set; }

    [Required]
    public string Email { get; set; }

    public string WorkUnit { get; set; }
    public string ImgProfile { get; set; }
    public bool Enabled { get; set; }
    public bool ChangePassword { get; set; }
    public string Role { get; set; }
    public DateTime BirthDate { get; set; }

    public Address Address { get; set; }
    public ICollection<Phone> Phones { get; set; }

    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}
