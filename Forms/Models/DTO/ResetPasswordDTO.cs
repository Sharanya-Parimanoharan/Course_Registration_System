using System;
namespace Forms.Models.DTO
{
    public record ResetPasswordDTO
	{
		public string email { get; set; }
		public string emailToken { get; set; }
		public string newPassword { get; set; }
        public string confirmPassword{ get; set; }

    }
}

