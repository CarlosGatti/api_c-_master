using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Cretoval_api.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Cretovale_api.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly CretovaleContext _context;
        private IConfiguration Configuration { get; }

        public LoginController(CretovaleContext context, IConfiguration configuration)
        {
            _context = context;
            Configuration = configuration;
        }

        public class UserLogin
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        [HttpPost]
        public IActionResult Post([FromBody] UserLogin user)
        {
            var userFromDb = _context.Users.FirstOrDefault(x => x.Email == user.Email);

            if (userFromDb == null || !userFromDb.Enabled ||
                !BCrypt.Net.BCrypt.Verify(user.Password, userFromDb.Password))
                return BadRequest(new {token = string.Empty, auth = false});

            var listRoles = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                new Claim(JwtRegisteredClaimNames.UniqueName, userFromDb.Email),
                new Claim("Roles", userFromDb.Role)
            };

            var jwt = new JwtSecurityToken(
                issuer: "csa",
                claims: listRoles,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Startup.JwtKey)), SecurityAlgorithms.HmacSha256)
            );
            var jwtToDelivery = new JwtSecurityTokenHandler().WriteToken(jwt);

            // passwords can't leave
            userFromDb.Password = string.Empty;
            return Ok(new {token = jwtToDelivery, auth = true, user = userFromDb});
        }

        [HttpGet]
        [Authorize]
        public object Check()
        {
            // check if user was disabled
            var isEnabled = _context.Users.Any(x => x.Email == User.Identity.Name && x.Enabled);
            if (isEnabled)
                return Ok(new { });
            return BadRequest(new { });
        }
    }
}
