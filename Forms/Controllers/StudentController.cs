
using System.Drawing;
using System.Security.Cryptography;
using Forms.Data;
using Forms.Helpers;
using Forms.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Forms.UtilityService;
using Forms.Models.DTO;

namespace Forms.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]

    public class StudentController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly CoursesDbContext _context;
        private readonly IEmailService _emailService;
        public StudentController(IConfiguration config, CoursesDbContext context, IEmailService emailService)
        {
            _config = config;
            _context = context;
            _emailService = emailService;
        }

        [AllowAnonymous]
        [HttpPost("send")]
        public async Task<IActionResult> Create(Student student)
        {
            if (_context.Students.Where(s => s.Studentid == student.Studentid || s.email == student.email).FirstOrDefault() != null)
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

        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var user = await _context.Students.FirstOrDefaultAsync(a => a.email == email);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Email doesnt Exist"
                });

            }
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.resetpasswordToken = emailToken;
            user.resetpasswordExpiry = DateTime.Now.AddMinutes(15);
            string from = _config["EmailSettings:From"];

            var emailModel = new Email(email, "Reset Password !", EmailBody.EmailStringBody(email, emailToken));
            _emailService.SendEmail(emailModel);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(new
            {
                StatusCode = 200,
                Message = "Email Sent"
            });
        }


        [HttpPost("reset-email")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO reset)
        {
            var newToken = reset.emailToken.Replace(" ", "+");
            var user = await _context.Students.AsNoTracking().FirstOrDefaultAsync(a => a.email == reset.email);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User doesnt Exist"
                });

            }
            var tokenCode = user.resetpasswordToken;
            DateTime emailTokenExpiry = user.resetpasswordExpiry;
            if (tokenCode != reset.emailToken || emailTokenExpiry < DateTime.Now)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = "Invalid Reset Link"
                });
            }
            user.pwd = reset.newPassword;
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(new
            {
                StatusCode = 200,
                Message = "Password Reset Successfully"
            });
        }


    }  

}
