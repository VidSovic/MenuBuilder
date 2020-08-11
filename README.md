# MenuBuilder

Angular:
- npm install
- ng serve

Tehnologije, ki sem uporabljal za zagon serverja in pregled nad njim:
- SQL Server Management Studio (SSMS) (https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
- SQL Server Express (https://www.microsoft.com/en-us/download/details.aspx?id=55994)

ASP.NET Core 3.1 API:
- Po vzpostavitvi serverja potrebno zagnati naslednji komandi "Update-Database -Context MenuBuilderContext" in "Update-Database -Context MenuItemContext" v Tools->NuGet Package Manager->Package Manager Console in potem se komande zapišejo v konzolo(Da se ustvari baza in potrebne tabele).
- Zagon z Start Without Debugging (Potrebno preveriti ali se port, ki je razviden na strani katero odpre ujemaja z porti v Angular aplikaciji)!
- Dodatni paketi, ki sem jih naložil(So sicer "Includani" v MenuBuilderApi.csproj ampak za vsak slučaj so našteti spodaj:
    -Microsoft.AspNetCore.Cors
    -Microsoft.EntityFrameworkCore
    -Microsoft.EntityFrameworkCore.Sqlite(Mislim da ni potreben in bil dodan pri preizkušanju)
    -Microsoft.EntityFrameworkCore.SqlServer
    -Microsoft.EntityFrameworkCore.Tools
    
Primer kakšne podatke sem vstavil v bazo
- Tabela MenuBuilder:
  -IdCategory npr. 12
  -Name npr. Sport
  -IdParent npr. 0 (Če je parent je 0 drugače pa številka drugega IdCategory)
- Tabela MenuItem:
  -Name npr. First menu
  -MenuItems npr. 12,13 (To so Idji kategorij "IdCategory" ločeni z vejico!)
  
  Upam da vam bo delalo tako kot meni :)
