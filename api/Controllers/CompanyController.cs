using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cretovale_api.Helpers;
using Cretovale_api.Models;
using Cretoval_api.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cretovale_api.Controllers
{
    public class CompanyController : ApiController<Company>
    {
        public CompanyController(CretovaleContext dbContext) : base(dbContext)
        {
        }

        public override IQueryable<Company> PreGetAll(IQueryable<Company> results)
        {
            return results.Include(x => x.Covenants);
        }

        public override IActionResult GetById(Guid id)
        {
            var record = DbSet.Include(x => x.Covenants).ToList().FirstOrDefault(x => x.Id == id);
            if (record == null)
                return NotFound();
            return Ok(record);
        }

        public override Company PreWrite(Company record)
        {
            var obj = DbSet.AsNoTracking().FirstOrDefault(x => x.Id == record.Id);
            record.Logo = obj?.Logo;
            return base.PreWrite(record);
        }

        [ValidateModel]
        [RequestSizeLimit(3000000)]
        [HttpPost("{id}/logo")]
        public async Task<IActionResult> Post([FromForm] IFormFile file, Guid id)
        {
            var obj = DbSet.Single(x => x.Id == id);
            if (obj == null) return BadRequest();

            // stream to bytes
            byte[] fileBytes;
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                fileBytes = ms.ToArray();
            }

            var fileName = FileHelper.SaveImg(fileBytes);

            // not an image
            if (string.IsNullOrEmpty(fileName)) return BadRequest();

            // updating the user with the img name
            obj.Logo = fileName;
            await DbContext.SaveChangesAsync();

            return Created(obj.Id.ToString(), PostRead(obj));
        }
        
        [HttpPost("[action]/{id}")]
        [ValidateModel]
        public IActionResult Covenant([FromBody] Covenant record, Guid id)
        {
            var obj = DbSet.Include(x => x.Covenants).Single(x => x.Id == id);
            if (obj == null) return BadRequest();
            
            record.DateCreated = DateTime.Now;
            record.DateUpdated = record.DateCreated;
            
            obj.Covenants.Add(record);
            if (DbContext.SaveChanges() == 0) return BadRequest();
            return Created(record.Id.ToString(), record);
        }
    }
}
