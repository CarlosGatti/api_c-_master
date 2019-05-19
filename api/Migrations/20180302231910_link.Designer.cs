﻿// <auto-generated />
using Cretoval_api.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Cretovaleapi.Migrations
{
    [DbContext(typeof(CretovaleContext))]
    [Migration("20180302231910_link")]
    partial class link
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125");

            modelBuilder.Entity("Cretovale_api.Models.Address", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("Complement");

                    b.Property<string>("Country");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<string>("Neighborhood");

                    b.Property<string>("Number");

                    b.Property<string>("State");

                    b.Property<string>("Street");

                    b.Property<string>("Zipcode");

                    b.HasKey("Id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Cretovale_api.Models.Company", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<string>("Logo");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Companys");
                });

            modelBuilder.Entity("Cretovale_api.Models.Config", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<string>("Key")
                        .IsRequired();

                    b.Property<string>("Value")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Configs");
                });

            modelBuilder.Entity("Cretovale_api.Models.Covenant", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Benefict");

                    b.Property<Guid>("CompanyId");

                    b.Property<string>("ContactEmail");

                    b.Property<string>("ContactName");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Phone");

                    b.Property<string>("Site");

                    b.Property<string>("Status");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Covenants");
                });

            modelBuilder.Entity("Cretovale_api.Models.Expense", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<decimal>("Value");

                    b.HasKey("Id");

                    b.ToTable("Expenses");
                });

            modelBuilder.Entity("Cretovale_api.Models.Link", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address")
                        .IsRequired();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Links");
                });

            modelBuilder.Entity("Cretovale_api.Models.Phone", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DDD")
                        .IsRequired();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<bool>("Enabled");

                    b.Property<string>("Number")
                        .IsRequired();

                    b.Property<string>("Type")
                        .IsRequired();

                    b.Property<Guid?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Phones");
                });

            modelBuilder.Entity("Cretovale_api.Models.PhoneExpense", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<Guid?>("ExpenseId");

                    b.Property<int>("Month");

                    b.Property<Guid?>("PhoneId");

                    b.Property<decimal>("Value");

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.HasIndex("ExpenseId");

                    b.HasIndex("PhoneId");

                    b.ToTable("PhoneExpenses");
                });

            modelBuilder.Entity("Cretovale_api.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("AddressId");

                    b.Property<DateTime>("BirthDate");

                    b.Property<bool>("ChangePassword");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<bool>("Enabled");

                    b.Property<string>("ImgProfile");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Password");

                    b.Property<string>("Role");

                    b.Property<string>("WorkUnit");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Cretovale_api.Models.Covenant", b =>
                {
                    b.HasOne("Cretovale_api.Models.Company", "Company")
                        .WithMany("Covenants")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cretovale_api.Models.Phone", b =>
                {
                    b.HasOne("Cretovale_api.Models.User", "User")
                        .WithMany("Phones")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Cretovale_api.Models.PhoneExpense", b =>
                {
                    b.HasOne("Cretovale_api.Models.Expense", "Expense")
                        .WithMany()
                        .HasForeignKey("ExpenseId");

                    b.HasOne("Cretovale_api.Models.Phone", "Phone")
                        .WithMany("PhoneExpenses")
                        .HasForeignKey("PhoneId");
                });

            modelBuilder.Entity("Cretovale_api.Models.User", b =>
                {
                    b.HasOne("Cretovale_api.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");
                });
#pragma warning restore 612, 618
        }
    }
}
