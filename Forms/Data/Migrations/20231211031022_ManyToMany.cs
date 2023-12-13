using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Forms.Data.Migrations
{
    /// <inheritdoc />
    public partial class ManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    scheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    year = table.Column<int>(type: "int", nullable: false),
                    startTIme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    endTIme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    deadLine = table.Column<DateTime>(type: "datetime2", nullable: false),
                    maxCapacity = table.Column<int>(type: "int", nullable: false),
                    currentEnrollment = table.Column<int>(type: "int", nullable: false),
                    instructor = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.scheduleId);
                });

            migrationBuilder.CreateTable(
                name: "CourseSchedules",
                columns: table => new
                {
                    code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    scheduleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseSchedules", x => new { x.code, x.scheduleId });
                    table.ForeignKey(
                        name: "FK_CourseSchedules_Courses_code",
                        column: x => x.code,
                        principalTable: "Courses",
                        principalColumn: "code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseSchedules_Schedules_scheduleId",
                        column: x => x.scheduleId,
                        principalTable: "Schedules",
                        principalColumn: "scheduleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseSchedules_scheduleId",
                table: "CourseSchedules",
                column: "scheduleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseSchedules");

            migrationBuilder.DropTable(
                name: "Schedules");
        }
    }
}
