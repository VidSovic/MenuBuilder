using Microsoft.EntityFrameworkCore.Migrations;

namespace MenuBuilderApi.Migrations.MenuBuilder
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MenuBuilder",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCategory = table.Column<string>(type: "varchar(5)", nullable: false),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    IdParent = table.Column<string>(type: "varchar(5)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuBuilder", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MenuBuilder");
        }
    }
}
