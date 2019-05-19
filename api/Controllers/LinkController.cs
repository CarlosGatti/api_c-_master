using Cretovale_api.Models;
using Cretoval_api.Context;

namespace Cretovale_api.Controllers
{
    public class LinkController : ApiController<Link>
    {
        public LinkController(CretovaleContext dbContext) : base(dbContext)
        {
        }
    }
}