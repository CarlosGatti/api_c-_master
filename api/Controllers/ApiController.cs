using System;
using System.Linq;
using Cretovale_api.Helpers;
using Cretovale_api.Models;
using Cretoval_api.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cretovale_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public abstract class ApiController<T> : Controller where T : class, IEntity
    {
        protected readonly CretovaleContext DbContext;
        protected readonly DbSet<T> DbSet;

        protected ApiController(CretovaleContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Set<T>();
        }

        [HttpGet("[action]")]
        public virtual IActionResult Count()
        {
            return Ok(DbSet.Count());
        }

        [HttpGet]
        [ValidateModel]
        public virtual IActionResult GetAll()
        {
            // need an IQueryable, fix this later
            var results = DbSet.Where(x => true);
            results = PreGetAll(results);
            return Ok(results);
        }

        [HttpGet("{id}")]
        [ValidateModel]
        public virtual IActionResult GetById(Guid id)
        {
            var record = DbSet.Single(x => x.Id == id);
            if (record == null)
                return NotFound();
            record = PostRead(record);
            return Ok(record);
        }

        [HttpPost]
        [ValidateModel]
        public virtual IActionResult Create([FromBody] T record)
        {
            record.DateCreated = DateTime.Now;
            record.DateUpdated = record.DateCreated;
            record = PreWrite(record);
            DbSet.Add(record);
            if (DbContext.SaveChanges() == 0)
                return BadRequest();
            record = PostRead(record);
            return Created(record.Id.ToString(), record);
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public virtual IActionResult Update(Guid id, [FromBody] T record)
        {
            if (id != record.Id)
                return BadRequest();
            record.DateUpdated = DateTime.Now;
            record = PreWrite(record);
            DbSet.Update(record);
            if (DbContext.SaveChanges() == 0)
                return BadRequest();
            record = PostRead(record);
            return Ok(record);
        }

        [HttpDelete("{id}")]
        [ValidateModel]
        public virtual IActionResult Delete(Guid id)
        {
            var record = DbSet.Remove(DbSet.Single(x => x.Id == id));
            if (DbContext.SaveChanges() == 0)
                return BadRequest();
            return NoContent();
        }

        public virtual T PreWrite(T record)
        {
            return record;
        }

        public virtual T PostRead(T record)
        {
            return record;
        }

        public virtual IQueryable<T> PreGetAll(IQueryable<T> record)
        {
            return record;
        }
    }
}
