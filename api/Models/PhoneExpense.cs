using System;
using System.ComponentModel.DataAnnotations;

namespace Cretovale_api.Models
{
  public class PhoneExpense : IEntity
  {
    public Guid Id { get; set; }

    public Phone Phone { get; set; }

    public Expense Expense { get; set; }

    [Required]
    public int Year { get; set; }

    [Required]
    public int Month { get; set; }

    [Required]
    public decimal Value { get; set; }

    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}
