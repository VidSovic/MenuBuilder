using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MenuBuilderApi.Models;

namespace MenuBuilderApi.Models
{
    public class MenuBuilderContext:DbContext
    {
        public MenuBuilderContext(DbContextOptions<MenuBuilderContext> options): base(options){}

        public DbSet<MenuBuilder> MenuBuilder { get; set; }

    }
}
