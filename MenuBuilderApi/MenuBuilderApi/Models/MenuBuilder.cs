using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MenuBuilderApi.Models
{
    public class MenuBuilder
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName ="varchar(5)")]
        public int IdCategory { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }
        [Column(TypeName = "varchar(5)")]
        public int IdParent { get; set; }
    }
}
