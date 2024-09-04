
using Microsoft.EntityFrameworkCore;

namespace FastFoodApi.Models
{
    public class FoodContext : DbContext
    {
       public FoodContext(DbContextOptions<FoodContext> options) : base(options)
        {

        }
        public DbSet<AppUser>Users { get; set; }
        public DbSet<FoodItem> FoodItems {  get; set; }
    }
}
