using Cretovale_api.Models;
using Cretoval_api.Context;

namespace Cretovale_api.Controllers
{
    public class ExpenseController : ApiController<Expense>
    {
        public ExpenseController(CretovaleContext dbContext) : base(dbContext)
        {
        }
    }
}
