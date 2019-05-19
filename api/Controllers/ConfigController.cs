using Cretovale_api.Models;
using Cretoval_api.Context;

namespace Cretovale_api.Controllers
{
    public class ConfigController : ApiController<Config>
    {
        public ConfigController(CretovaleContext dbContext) : base(dbContext)
        {
        }
    }
}
