using System;

namespace Cretovale_api.Models
{
  public class Address : IEntity
  {
    public Guid Id { get; set; }

    public string Street { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string Number { get; set; }
    public string Complement { get; set; }
    public string Zipcode { get; set; }
    public string Neighborhood { get; set; }
    public string State { get; set; }

    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
  }
}
