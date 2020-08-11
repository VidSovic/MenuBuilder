using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MenuBuilderApi.Models;

namespace MenuBuilderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuBuildersController : ControllerBase
    {
        private readonly MenuBuilderContext _context;

        public MenuBuildersController(MenuBuilderContext context)
        {
            _context = context;
        }

        // GET: api/MenuBuilders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuBuilder>>> GetMenuBuilder()
        {
            return await _context.MenuBuilder.ToListAsync();
        }

        // GET: api/MenuBuilders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MenuBuilder>> GetMenuBuilder(int id)
        {
            var menuBuilder = await _context.MenuBuilder.FindAsync(id);

            if (menuBuilder == null)
            {
                return NotFound();
            }

            return menuBuilder;
        }

        // PUT: api/MenuBuilders/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuBuilder(int id, MenuBuilder menuBuilder)
        {
            if (id != menuBuilder.Id)
            {
                return BadRequest();
            }

            _context.Entry(menuBuilder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuBuilderExists(id))
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

        // POST: api/MenuBuilders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MenuBuilder>> PostMenuBuilder(MenuBuilder menuBuilder)
        {
            _context.MenuBuilder.Add(menuBuilder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMenuBuilder", new { id = menuBuilder.Id }, menuBuilder);
        }

        // DELETE: api/MenuBuilders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MenuBuilder>> DeleteMenuBuilder(int id)
        {
            var menuBuilder = await _context.MenuBuilder.FindAsync(id);
            if (menuBuilder == null)
            {
                return NotFound();
            }

            _context.MenuBuilder.Remove(menuBuilder);
            await _context.SaveChangesAsync();

            return menuBuilder;
        }

        private bool MenuBuilderExists(int id)
        {
            return _context.MenuBuilder.Any(e => e.Id == id);
        }
    }
}
