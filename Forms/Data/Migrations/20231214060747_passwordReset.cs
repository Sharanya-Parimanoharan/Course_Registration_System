using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Forms.Data.Migrations
{
    /// <inheritdoc />
    public partial class passwordReset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "resetpasswordExpiry",
                table: "Students",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "resetpasswordToken",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "resetpasswordExpiry",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "resetpasswordToken",
                table: "Students");
        }
    }
}
