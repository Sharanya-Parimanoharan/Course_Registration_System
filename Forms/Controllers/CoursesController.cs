using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Forms.Data;
using Forms.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Forms.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class CoursesController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly CoursesDbContext _context;

        public CoursesController(IConfiguration config, CoursesDbContext context)
        {
            _config = config;
            _context = context;
        }


        [AllowAnonymous]
        [HttpPost("send")]
        public async Task<IActionResult> Create(Courses course)
        {
            if (_context.Courses.Where(s => s.code == course.code).FirstOrDefault() != null)
            {
                return Ok("AlreadyExist");
            }
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();

            return Ok("Success");
        }

        [HttpGet("get")]  //method that handles get request
        public async Task<IEnumerable<Courses>> Get() =>
             await _context.Courses.ToArrayAsync();



        [HttpDelete("delete/{code}")]
        public async Task<IActionResult> Delete(String code)
        {
            var course = await _context.Courses.FindAsync(code);
            if (course == null) return Ok("Failed");

            var schedulesToDelete = _context.CourseSchedules
            .Where(cs => cs.code == code)
            .Select(cs => cs.scheduleId)
            .ToList();

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();


            // Delete the associated schedules
            foreach (var scheduleId in schedulesToDelete)
            {
                var schedule = await _context.Schedules.FindAsync(scheduleId);
                if (schedule != null)
                {
                    _context.Schedules.Remove(schedule);
                }
            }

            await _context.SaveChangesAsync();


            return Ok("Success");

        }

        [HttpPut("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(String code,Courses course)
        {
            if (code != course.code) return Ok("Failure");

            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok("Success");
        }
    }


}