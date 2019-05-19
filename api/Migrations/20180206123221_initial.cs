using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Cretovaleapi.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    City = table.Column<string>(nullable: true),
                    Complement = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Neighborhood = table.Column<string>(nullable: true),
                    Number = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    Zipcode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companys",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Configs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Key = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Category = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AddressId = table.Column<Guid>(nullable: true),
                    ChangePassword = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Enabled = table.Column<bool>(nullable: false),
                    ImgProfile = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    WorkUnit = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Covenants",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Benefict = table.Column<string>(nullable: true),
                    CompanyId = table.Column<Guid>(nullable: false),
                    ContactEmail = table.Column<string>(nullable: true),
                    ContactName = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Phone = table.Column<string>(nullable: true),
                    Site = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Covenants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Covenants_Companys_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Phones",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DDD = table.Column<string>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Enabled = table.Column<bool>(nullable: false),
                    Number = table.Column<string>(nullable: false),
                    Type = table.Column<string>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Phones_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PhoneExpenses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    ExpenseId = table.Column<Guid>(nullable: true),
                    Month = table.Column<int>(nullable: false),
                    PhoneId = table.Column<Guid>(nullable: true),
                    Value = table.Column<decimal>(nullable: false),
                    Year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhoneExpenses_Expenses_ExpenseId",
                        column: x => x.ExpenseId,
                        principalTable: "Expenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PhoneExpenses_Phones_PhoneId",
                        column: x => x.PhoneId,
                        principalTable: "Phones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Covenants_CompanyId",
                table: "Covenants",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PhoneExpenses_ExpenseId",
                table: "PhoneExpenses",
                column: "ExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_PhoneExpenses_PhoneId",
                table: "PhoneExpenses",
                column: "PhoneId");

            migrationBuilder.CreateIndex(
                name: "IX_Phones_UserId",
                table: "Phones",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressId",
                table: "Users",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Configs");

            migrationBuilder.DropTable(
                name: "Covenants");

            migrationBuilder.DropTable(
                name: "PhoneExpenses");

            migrationBuilder.DropTable(
                name: "Companys");

            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "Phones");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Addresses");
        }
    }
}
