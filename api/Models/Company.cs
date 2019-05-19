using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cretovale_api.Models
{
  public class Company : IEntity
  {
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }
    public string Logo { get; set; }

    public ICollection<Covenant> Covenants { get; set; }

    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}
