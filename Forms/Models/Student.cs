using System;
using System.ComponentModel.DataAnnotations;

namespace Forms.Models
{
	public class Student
	{
		public string firstname { get; set; }
		public string lastname { get; set; }
        [Key]
        public string Studentid { get; set; }
		public string mobile { get; set; }
		public string email  { get; set; }
		public string degree { get; set; }
		public string pwd { get; set; }
		public DateTime memberSince { get; set; }
        public string role { get; set; }
		public string? resetpasswordToken { get; set; }
		public DateTime resetpasswordExpiry { get; set; }
		public Student()
        {

        }
	}
}

