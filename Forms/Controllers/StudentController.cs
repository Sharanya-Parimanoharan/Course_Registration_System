
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

    public class StudentController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly CoursesDbContext _context;

        public StudentController(IConfiguration config, CoursesDbContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("send")]
        public async Task<IActionResult> Create(Student student)
        {
            if (_context.Students.Where(s => s.Studentid == student.Studentid || s.email==student.email).FirstOrDefault() != null)
            {
                return Ok("AlreadyExist");
            }
            student.memberSince = DateTime.Now;
            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();

            return Ok("Success");
        }

        [HttpGet]  //method that handles get request
        public async Task<IEnumerable<Student>> Get() =>
             await _context.Students.ToArrayAsync();


        [AllowAnonymous]
        [HttpPost("loginUser")]
        public IActionResult login(login student)
        {
            var studentAvailable = _context.Students.Where(u => u.email == student.email && u.pwd == student.pwd).FirstOrDefault();
            if (studentAvailable != null)
            {
                return Ok(new JwtService(_config).GenerateToken(
                    studentAvailable.Studentid,
                    studentAvailable.firstname,
                    studentAvailable.lastname,
                    studentAvailable.email,
                    studentAvailable.degree,
                    studentAvailable.mobile,
                    studentAvailable.memberSince,
                    studentAvailable.role
                    ));
            }
            return Ok("Failure");
        }

        [HttpPut("send/{code}")]
        public async Task<IActionResult> Update(string code, Student student)
        {
            if (code != student.Studentid) return Ok("Failure");

            if (student.pwd == "")
            {
                var studentAvailable = _context.Students.Where(u => u.Studentid == student.Studentid).FirstOrDefault();
                if (studentAvailable != null)
                {
                    student.pwd = studentAvailable.pwd;
                    _context.Entry(studentAvailable).State = EntityState.Detached;

                    _context.Entry(student).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok("Success");

                }
            }
            else
            {
                _context.Entry(student).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return Ok("Success");
        }
    }


}
