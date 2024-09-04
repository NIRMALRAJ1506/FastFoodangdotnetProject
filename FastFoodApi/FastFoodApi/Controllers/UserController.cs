using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FastFoodApi.Models;
using System.Threading.Tasks;

namespace FastFoodApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FoodContext _context;

        public UserController(FoodContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AppUser model)
        {
            if (await _context.Users.AnyAsync(u => u.Username == model.Username))
            {
                return BadRequest("Username already exists.");
            }

            model.Role = "User"; // Set role as 'User'

            _context.Users.Add(model);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Username == model.Username && u.Role == "User");

            if (user == null || user.Password != model.Password)
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(new { message = "Login successful" });
        }
    }
}
