using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cretovale_api.Models
{
  public class Phone : IEntity
  {
    public Guid Id { get; set; }

    [Required]
    public string Type { get; set; }

    [Required]
    public string DDD { get; set; }

    [Required]
    public string Number { get; set; }

    public bool Enabled { get; set; }

    public User User { get; set; }
    public ICollection<PhoneExpense> PhoneExpenses { get; set; }

    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}
