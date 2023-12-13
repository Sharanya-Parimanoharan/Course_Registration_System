
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Forms.Models
{
	public class Schedules
	{
		
		

		[Key]
		public int scheduleId { get; set; }
		[ForeignKey("Courses")]
        public string CourseId { get; set; }

		public string year { get; set; }
		public TimeSpan startTIme { get; set; }
        public TimeSpan endTIme { get; set; }
        public DateTime deadLine { get; set; }
        public int maxCapacity { get; set; }
        public int currentEnrollment { get; set; }
        public string instructor { get; set; }

		public ICollection<CourseSchedules> CourseSchedules { get; set; }
		
    }
}

