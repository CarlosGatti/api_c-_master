using System;

namespace Cretovale_api.Models
{
  public interface IEntity
  {
    Guid Id { get; set; }
    DateTime DateCreated { get; set; }
    DateTime DateUpdated { get; set; }
  }
}
