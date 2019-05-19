using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Cretovale_api
{
  // ReSharper disable once ClassNeverInstantiated.Global
  public class Program
  {
    public static void Main(string[] args)
    {
      BuildWebHost(args).Run();
    }

    // ReSharper disable once MemberCanBePrivate.Global
    public static IWebHost BuildWebHost(string[] args) =>
      WebHost.CreateDefaultBuilder(args)
        .UseStartup<Startup>()
        .Build();
  }
}
