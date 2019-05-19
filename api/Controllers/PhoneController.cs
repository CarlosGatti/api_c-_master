using System;
using System.Collections.Generic;
using System.Linq;
using Cretovale_api.Helpers;
using Cretovale_api.Models;
using Cretoval_api.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cretovale_api.Controllers
{
    public class PhoneController : ApiController<Phone>
    {
        public PhoneController(CretovaleContext dbContext) : base(dbContext)
        {
        }

        public override IActionResult Create(Phone record)
        {
            return NotFound();
        }

        [HttpPost("[action]/{id}")]
        [ValidateModel]
        public IActionResult Expense([FromBody] PhoneExpense record, Guid id)
        {
            var user = DbSet.Include(x => x.PhoneExpenses).FirstOrDefault(x => x.Id == id);
            var expense = DbContext.Expenses.Single(x => x.Id == record.Expense.Id);
            if (user == null || expense == null) return BadRequest();
            record.DateCreated = DateTime.Now;
            record.DateUpdated = record.DateCreated;
            record.Expense = null;
            record.Expense = expense;
            user.PhoneExpenses.Add(record);
            if (DbContext.SaveChanges() == 0)
                return BadRequest();
            return Created(record.Id.ToString(), record);
        }

        public override IActionResult GetById(Guid id)
        {
            var record = DbSet.Include(x => x.PhoneExpenses).ThenInclude(x => x.Expense).ToList()
                .FirstOrDefault(x => x.Id == id);
            if (record == null)
                return NotFound();
            return Ok(record);
        }

        private class ExpenseResume
        {
            public int Year { get; set; }
            public List<decimal?> Data { get; set; }
        }

        [HttpGet("[action]")]
        public IActionResult GetPhoneExpenseResume()
        {
            var expensesResume = new List<ExpenseResume>();
            var expenses = DbContext.PhoneExpenses;

            foreach (var expYear in expenses.GroupBy(pe => pe.Year))
            {
                var expMonthList = new ExpenseResume {Data = new List<decimal?>()};
                for (var i = 1; i <= 12; i++)
                {
                    expMonthList.Data.Add(expYear.Where(x => x.Month == i).Sum(x => x.Value));
                }
                var firstOrDefault = expYear.FirstOrDefault();
                if (firstOrDefault?.Year == null) continue;
                expMonthList.Year = firstOrDefault.Year;
                expensesResume.Add(expMonthList);
            }

            return Ok(expensesResume);
        }
    }
}
