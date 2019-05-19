using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cretovale_api.Helpers;
using Cretovale_api.Models;
using Cretoval_api.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cretovale_api.Controllers
{
    public class UserController : ApiController<User>
    {
        public UserController(CretovaleContext dbContext) : base(dbContext)
        {
        }

        [Authorize(Roles = "admin")]
        public override IActionResult Create([FromBody] User record)
        {
            return base.Create(record);
        }

        public override IQueryable<User> PreGetAll(IQueryable<User> record)
        {
            record = record.Include(x => x.Phones);
            foreach (var user in record)
            {
                user.Password = string.Empty;
            }

            return record;
        }

        [HttpGet("{id}")]
        [ValidateModel]
        public override IActionResult GetById(Guid id)
        {
            var record = DbSet.Include(x => x.Address).Include(x => x.Phones)
                .ToList().FirstOrDefault(x => x.Id == id);
            if (record == null)
                return NotFound();
            record = PostRead(record);
            return Ok(record);
        }

        public override User PreWrite(User record)
        {
            if (string.IsNullOrEmpty(record.Password)) return null;
            record.Password = BCrypt.Net.BCrypt.HashPassword(record.Password);
            return record;
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public override IActionResult Update(Guid id, [FromBody] User record)
        {
            if (id != record.Id)
                return BadRequest();

            var user = DbSet.AsNoTracking().SingleOrDefault(x => x.Id == id);
            if (user == null) return BadRequest();

            record.DateUpdated = DateTime.Now;

            if (!string.IsNullOrEmpty(record.Password))
                record = PreWrite(record);
            else
                record.Password = user.Password;

            DbSet.Update(record);
            if (DbContext.SaveChanges() == 0)
                return BadRequest();

            return Ok(PostRead(record));
        }

        public override User PostRead(User record)
        {
            record.Password = string.Empty;
            return record;
        }

        [HttpPost("[action]/{id}")]
        [ValidateModel]
        public IActionResult Phone([FromBody] Phone record, Guid id)
        {
            var user = DbSet.Include(x => x.Phones).Single(x => x.Id == id);
            if (user == null) return BadRequest();

            record.DateCreated = DateTime.Now;
            record.DateUpdated = record.DateCreated;
            record.Enabled = true;
            record.PhoneExpenses = new List<PhoneExpense>();

            user.Phones.Add(record);
            if (DbContext.SaveChanges() == 0) return BadRequest();
            return Created(record.Id.ToString(), record);
        }

        [ValidateModel]
        [RequestSizeLimit(3000000)]
        [HttpPost("{id}/photo")]
        public async Task<IActionResult> PostUser([FromForm] IFormFile file, Guid id)
        {
            var user = DbSet.Single(x => x.Id == id);
            if (user == null) return BadRequest();

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
            user.ImgProfile = fileName;
            await DbContext.SaveChangesAsync();

            return Created(user.Id.ToString(), PostRead(user));
        }
    }
}