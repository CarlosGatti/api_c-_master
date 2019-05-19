using System;
using System.Linq;
using Cretovale_api.Models;
using Cretoval_api.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cretovale_api.Controllers
{
    public class CovenantController : ApiController<Covenant>
    {
        public CovenantController(CretovaleContext dbContext) : base(dbContext)
        {
        }
        
        // create covenant is at companyController
        public override IActionResult Create(Covenant record)
        {
            return NotFound();
        }

        public override IQueryable<Covenant> PreGetAll(IQueryable<Covenant> results)
        {
            return results.Include(x => x.Company);
        }

        public override IActionResult GetById(Guid id)
        {
            var record = DbSet.Include(x => x.Company)
                .ToList().FirstOrDefault(x => x.Id == id);
            if (record == null)
                return NotFound();
            return Ok(record);
        }
    }
}
