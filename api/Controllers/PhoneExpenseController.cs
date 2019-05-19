using System;
using System.Linq;
using Cretovale_api.Helpers;
using Cretovale_api.Models;
using Cretoval_api.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.EntityFrameworkCore;

namespace Cretovale_api.Controllers
{
    public class PhoneExpenseController : ApiController<PhoneExpense>
    {
        public PhoneExpenseController(CretovaleContext dbContext) : base(dbContext)
        {
        }

        public override IQueryable<PhoneExpense> PreGetAll(IQueryable<PhoneExpense> record)
        {
            return record.Include(x => x.Expense);
        }

        public override IActionResult Create(PhoneExpense record)
        {
            return NotFound();
        }
    }
}
