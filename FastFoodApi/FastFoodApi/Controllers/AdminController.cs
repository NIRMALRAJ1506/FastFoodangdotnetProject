using FastFoodApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FastFoodApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly FoodContext _context;

        public AdminController(FoodContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (await _context.Users.AnyAsync(u => u.Username == model.Username))
            {
                return BadRequest("Username already exists.");
            }

            var admin = new AppUser
            {
                Name = model.Name,
                Dob = model.Dob,
                ContactNo = model.ContactNumber,
                Email = model.Email,
                Username = model.Username,
                Password = model.Password, // You should encrypt passwords in a real application
                Role = "Admin"
            };

            _context.Users.Add(admin);
            await _context.SaveChangesAsync();

            return Ok("Admin registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var admin = await _context.Users
                .SingleOrDefaultAsync(u => u.Username == model.Username && u.Password == model.Password && u.Role == "Admin");

            if (admin == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(new { message = "Admin login successful" });
        }
    }
}
