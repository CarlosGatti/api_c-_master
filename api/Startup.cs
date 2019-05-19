using System.IO;
using System.Text;
using Cretoval_api.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Cretovale_api
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class Startup
    {
        public const string JwtKey = "6y+$1vwl&csk9x7x9o$_7@4ontk&6=i@y-0z#@q==pse3a8wqz";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling =
                    Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddDbContextPool<CretovaleContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(jwtBearerOptions =>
            {
                jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtKey)),
                    ValidIssuer = "csa",
                    // Disable token integrity validations
                    ValidateAudience = false,
                    ValidateActor = false,
                    RoleClaimType = "roles"
                };
            });

            services.AddAuthorization(authorizationOptions =>
            {
                authorizationOptions.DefaultPolicy =
                    new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                        .RequireAuthenticatedUser().Build();
            });

            services.AddCors(o => o.AddPolicy("CorsAllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("CorsAllowAll");
            }
            
            app.UseFileServer(new FileServerOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "upload")),
                RequestPath = "/upload",
                EnableDirectoryBrowsing = true
            });
            
            app.UseMvc();
        }
    }
}
