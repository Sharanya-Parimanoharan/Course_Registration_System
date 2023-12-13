using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Forms.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Forms.Data
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class SchedulesController : ControllerBase
    {

        private readonly IConfiguration _config;
        public readonly CoursesDbContext _context;

        public SchedulesController(IConfiguration config, CoursesDbContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("send")]
        public async Task<IActionResult> Create(Schedules schedule)
        {
            var existingCourse = _context.Courses.FirstOrDefault(c => c.code == schedule.CourseId);
            if (existingCourse != null)
            {
                Schedules newSchedule = new Schedules
                {
                    CourseId=schedule.CourseId,
                    year = schedule.year, // Add this property to your Schedule class
                    startTIme = schedule.startTIme, // Add this property to your Schedule class
                    endTIme = schedule.endTIme, // Add this property to your Schedule class
                    deadLine = schedule.deadLine, // Add this property to your Schedule class
                    maxCapacity = schedule.maxCapacity, // Add this property to your Schedule class
                    currentEnrollment = schedule.currentEnrollment, // You may set this to 0 initially
                    instructor = schedule.instructor, // Add this property to your Schedule class
                    CourseSchedules = new List<CourseSchedules>() // Initialize the navigation property
                };
                CourseSchedules courseSchedule = new CourseSchedules
                {
                    Course = existingCourse,
                    Schedule = newSchedule
                };

                newSchedule.CourseSchedules.Add(courseSchedule);

                await _context.Schedules.AddAsync(newSchedule);
                await _context.SaveChangesAsync();

                return Ok("Success");
            }
            return Ok("Course Not Found");
        }



        [HttpGet("get")]  //method that handles get request
        public async Task<IEnumerable<Schedules>> Get() =>
                     await _context.Schedules.ToArrayAsync();





        [HttpDelete("delete/{code}")]
        public async Task<IActionResult> Delete(int code)
        {
            var schedule = await _context.Schedules.FindAsync(code);
            Console.WriteLine(schedule);
            if (schedule == null) return Ok("Failed");

            _context.Schedules.Remove(schedule); 

            await _context.SaveChangesAsync();

            return Ok("Success");

        }

        [HttpPut("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(int code, Schedules schedules)
        {
            if (code != schedules.scheduleId) return Ok("Failure");

            

            _context.Entry(schedules).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok("Success");
        }
    }
}