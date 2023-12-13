using System;
using System.ComponentModel.DataAnnotations;

namespace Forms.Models
{
	public class Courses
	{
		public Courses()
		{
		}
		public string name { get; set; }
        [Key]
        [Required]
		public string code { get; set; }
		public string department { get; set; }
		public string preRequirements { get; set; }

        public ICollection<CourseSchedules> CourseSchedule { get; set; }

    }
}

