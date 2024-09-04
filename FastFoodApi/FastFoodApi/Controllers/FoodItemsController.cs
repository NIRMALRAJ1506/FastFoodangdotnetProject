using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FastFoodApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastFoodApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemsController : ControllerBase
    {
        private readonly FoodContext _context;

        public FoodItemsController(FoodContext context)
        {
            _context = context;
        }

        // GET: api/fooditems
        // GET: api/fooditems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodItem>>> GetFoodItems(string type)
        {
            // Ensure `type` is not null and trimmed
            if (string.IsNullOrWhiteSpace(type))
            {
                return BadRequest("Type parameter is required.");
            }

            var lowerCaseType = type.ToLower();

            var foodItems = await _context.FoodItems
                .Where(f => f.FoodType.ToLower() == lowerCaseType)
                .ToListAsync();

            return Ok(foodItems);
        }





        // GET: api/fooditems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodItem>> GetFoodItem(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);

            if (foodItem == null)
            {
                return NotFound();
            }

            return foodItem;
        }

        // POST: api/fooditems
        [HttpPost]
        public async Task<ActionResult<FoodItem>> PostFoodItem(FoodItem foodItem)
        {
            try
            {
                _context.FoodItems.Add(foodItem);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetFoodItem), new { id = foodItem.Id }, foodItem);
            }
            catch (Exception ex)
            {
                // Log exception or return a detailed error response
                return BadRequest(new { message = ex.Message });
            }
        }


        // PUT: api/fooditems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodItem(int id, [FromBody] FoodItem foodItem)
        {
            // Validate the request
            if (id != foodItem.Id)
            {
                return BadRequest("ID mismatch");
            }

            // Check if the item exists
            var existingItem = await _context.FoodItems.FindAsync(id);
            if (existingItem == null)
            {
                return NotFound();
            }

            // Update the existing item with new values
            existingItem.Name = foodItem.Name;
            existingItem.Description = foodItem.Description;
            existingItem.Price = foodItem.Price;
            existingItem.ImgUrl = foodItem.ImgUrl;
            existingItem.FoodType = foodItem.FoodType;

            // Mark the entity as modified
            _context.Entry(existingItem).State = EntityState.Modified;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Handle concurrency issues
                if (!FoodItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Check if the FoodItem exists
        private bool FoodItemExists(int id)
        {
            return _context.FoodItems.Any(e => e.Id == id);
        }


        // DELETE: api/fooditems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoodItem(int id)
        {
            var foodItem = await _context.FoodItems.FindAsync(id);
            if (foodItem == null)
            {
                return NotFound();
            }

            _context.FoodItems.Remove(foodItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
