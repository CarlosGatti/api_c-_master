using Cretovale_api.Models;
using Microsoft.EntityFrameworkCore;

// ReSharper disable UnusedAutoPropertyAccessor.Global

namespace Cretoval_api.Context
{
  public class CretovaleContext : DbContext
  {
    // ReSharper disable once SuggestBaseTypeForParameter
    public CretovaleContext(DbContextOptions<CretovaleContext> options)
      : base(options)
    {
    }

    public DbSet<Address> Addresses { get; set; }
    public DbSet<Phone> Phones { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Config> Configs { get; set; }
    public DbSet<PhoneExpense> PhoneExpenses { get; set; }
    public DbSet<Expense> Expenses { get; set; }
    public DbSet<Covenant> Covenants { get; set; }
    public DbSet<Company> Companys { get; set; }
    public DbSet<Link> Links { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      builder.Entity<User>()
        .HasIndex(u => u.Email)
        .IsUnique();
    }
  }
}
