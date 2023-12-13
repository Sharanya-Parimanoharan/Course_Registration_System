using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Forms.Models
{
	public class JwtService
	{
        public String SecretKey { get; set; }
        public int TokenDuration { get; set; }
		private readonly IConfiguration config;

        public JwtService(IConfiguration _config) 
		{
			config = _config;
			this.SecretKey = config.GetSection("jwtConfig").GetSection("Key").Value;
			this.TokenDuration = Int32.Parse(config.GetSection("jwtConfig").GetSection("Duration").Value);


		}

		public String GenerateToken(String Studentid, String firstname, String lastname, String email, String degree, String mobile, DateTime memberSince,String role)
		{
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));
			var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
			var payload = new[]
			{
				new Claim("id",Studentid),
                new Claim("firstname",firstname),
                new Claim("lastname",lastname),
				new Claim("email",email),
				new Claim("mobile",mobile),
				new Claim("degree",degree),
                new Claim("member",memberSince.ToString()),
                new Claim("role",role)



            };
			//genertes a token
			var jwtToken = new JwtSecurityToken(
				issuer:"localhost",
				audience:"localhost" ,
				claims:payload,
				expires:DateTime.Now.AddMinutes(TokenDuration),
				signingCredentials:signature
				);

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
			//converts jwt tokens to string
		}
	}
}

 