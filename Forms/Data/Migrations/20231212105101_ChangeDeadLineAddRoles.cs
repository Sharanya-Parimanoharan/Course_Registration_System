using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Forms.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDeadLineAddRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "role",
                table: "Schedules",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "role",
                table: "Schedules");
        }
    }
}
