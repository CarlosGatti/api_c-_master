using System;
using System.ComponentModel.DataAnnotations;

namespace Cretovale_api.Models
{
  public class Expense : IEntity
  {
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    public string Category { get; set; }

    [Required]
    public decimal Value { get; set; }

    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}
