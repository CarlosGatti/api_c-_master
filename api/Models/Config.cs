using System;
using System.ComponentModel.DataAnnotations;

namespace Cretovale_api.Models
{
  public class Config : IEntity
  {
    public Guid Id { get; set; }

    [Required]
    public string Key { get; set; }

    [Required]
    public string Value { get; set; }

    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}
