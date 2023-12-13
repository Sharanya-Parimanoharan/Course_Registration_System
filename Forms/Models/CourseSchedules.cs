using System;
using System.ComponentModel.DataAnnotations;

namespace Forms.Models
{
	public class CourseSchedules
	{
        public CourseSchedules()
        {
        }

        public string code { get; set; }
        public Courses Course { get; set; }

        public int scheduleId { get; set; }
        public Schedules Schedule { get; set; }
    }
}

