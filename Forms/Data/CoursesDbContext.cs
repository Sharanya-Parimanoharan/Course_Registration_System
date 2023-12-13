using System;
using Forms.Models;
using Microsoft.EntityFrameworkCore;

namespace Forms.Data
{
	public class CoursesDbContext:DbContext
	{
		public CoursesDbContext(DbContextOptions options) : base(options)
		{
		}
        public DbSet<Student> Students { get; set; }
        public DbSet<Courses> Courses { set; get; }
        public DbSet<Schedules> Schedules { get; set; }
        public DbSet<CourseSchedules> CourseSchedules { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CourseSchedules>()
                .HasKey(cs => new { cs.code, cs.scheduleId });

            modelBuilder.Entity<CourseSchedules>()
                .HasOne(cs => cs.Course)
                .WithMany(c => c.CourseSchedule)
                .HasForeignKey(cs => cs.code)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CourseSchedules>()
                .HasOne(cs => cs.Schedule)
                .WithMany(s => s.CourseSchedules)
                .HasForeignKey(cs => cs.scheduleId)
                .OnDelete(DeleteBehavior.Cascade);

                    base.OnModelCreating(modelBuilder);


        }
    }
}

