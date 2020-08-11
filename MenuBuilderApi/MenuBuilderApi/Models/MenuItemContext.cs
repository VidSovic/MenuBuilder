using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MenuBuilderApi.Models
{
    public class MenuItemContext: DbContext
    {
        public MenuItemContext(DbContextOptions<MenuItemContext> options) : base(options) { }

        public DbSet<MenuItem> MenuItem { get; set; }
    }
}
