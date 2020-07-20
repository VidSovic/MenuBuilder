import { Injectable } from '@angular/core';
import { Menu } from './menu-builder.model';
import { Subject } from 'rxjs';
import { MenuList } from './menu-list/menu-list.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MenuBuilderService{
  private menuItemsUpdated = new Subject<Menu[]>();
  private menusUpdated= new Subject<MenuList[]>();
  private errorSub = new Subject<string>();
  private selectedMenuSub = new Subject<MenuList>();

  items: Menu[] = [];

  menuItems: Menu[] = [];

  menus: MenuList[] = [];

  selectedMenu: MenuList;

  constructor(private http: HttpClient){}


  fetchCategorys(){
    return this.http.get<Menu[]>('http://localhost:58979/api/MenuBuilders');
  }

  fetchMenus(){

    //POTREBNO SPREMENITI GLEDE NA ZAHTEVE PB!
    //Spodaj navedene vrstice med komentarjema spremenijo dobljen string IDjev in shranijo menuje z ujemajočimi IDji
    this.menus=[];
    return this.http.get('http://localhost:58979/api/MenuLists')
    .subscribe(menus =>{
      //-------------------------------------------------------------------
      let menuIds = [];
      let menusArray: Menu[];
      for(const id in menus){
        menusArray = [];
        let menusStr = JSON.stringify(menus[id].menuItems);
        menusStr = menusStr.substring(1,menusStr.length-1);
        menuIds = menusStr.split(',');
        let counter = 0;
        for(let item of this.items){
          let parsedInt = menuIds[counter];
          if(parsedInt == item.idCategory){
            menusArray.push(item);
          }
          counter++;
        }
        this.menus.push({id: menus[id].id, name: menus[id].name, menuItems: menusArray})
      }
      this.menusUpdated.next([...this.menus]);
      //-------------------------------------------------------------------
    }, error =>{
        this.errorSub.next(error);
    });
  }


getMenuItemsUpdatedListener(){
  return this.menuItemsUpdated.asObservable();
}

getMenusUpdatedListener(){
  return this.menusUpdated.asObservable();
}

getSelectedMenu(){
  return this.selectedMenuSub.asObservable();
}

getError(){
  return this.errorSub.asObservable();
}

updateListenerCategory(categorys: Menu[]){
  this.items = categorys;
  this.menuItemsUpdated.next([...categorys]);
}
updateListenerMenu(menus: MenuList[]){
  this.menus = menus;
  this.menusUpdated.next([...menus]);
}

sortParentChild(){
   return this.items.sort((a, b) => (a.idCategory > b.idCategory) ? 1 : -1);
}
sortParentChildMenuItems(){
  return this.menuItems.sort((a, b) => (a.idCategory > b.idCategory) ? 1 : -1);
}

addItemToMenuList(id: number){
  if(this.menuItems.includes(this.items[id])){
    return;
  }
  this.menuItems.push(this.items[id]);
  this.menuItemsUpdated.next([...this.menuItems]);

  return this.sortParentChildMenuItems();
}

addItemWithChilds(id: number){
  for(let item of this.items){
    if(item.idParent === id || item.idCategory === id){
      if(!this.menuItems.includes(item)){
        this.menuItems.push(item);
      }
    }
  }
  this.menuItemsUpdated.next([...this.menuItems]);
  return this.sortParentChildMenuItems();
}
addMenuToList(name: string){

  //POTREBNO SPREMENITI GLEDE NA ZAHTEVE PB!
  //spodaj navedene vrstice spremenijo polje Menujev v string njihovih IDjev (npr. "12,13,14")
  //Iz zgoraj navedenih IDjev se tako razbere kateri menuji so bili mišljeni in se tako obdelajo
  let menuStr='';
  let count = 0;
  for(let menu of this.menuItems){
    if(count < this.menuItems.length-1){
      menuStr = menuStr.concat(menu.idCategory.toString()+',');
    }else{
      menuStr = menuStr.concat(menu.idCategory.toString());
    }
    count++;
  }
  const menuData = {name: name, menuItems: menuStr};
  //--------------------------------------------------------------------------------------------

  this.http.post('http://localhost:58979/api/MenuLists',
  menuData).subscribe(()=>{
    this.fetchMenus();
  }, error =>{
    this.errorSub.next(error.message)
  });
  this.clearMenu();

}

onSelectMenu(id: number){
  let selectedMenu = [];
  selectedMenu = this.menus.filter(menus => menus.id === id);
  this.selectedMenu = selectedMenu[0];
  this.menuItems = this.selectedMenu.menuItems;
  this.menuItemsUpdated.next([...this.menuItems]);
  this.selectedMenuSub.next(this.selectedMenu);
}

removeItemWithChilds(id: number){
  this.menuItems = this.menuItems.filter(menuItem => menuItem.idParent !== id);
  this.menuItemsUpdated.next([...this.menuItems]);
  return this.sortParentChildMenuItems();
}

removeItemFromMenuList(id: number){
  this.menuItems = this.menuItems.filter(menuItems => menuItems.idCategory !== id)
  this.menuItemsUpdated.next([...this.menuItems]);
}


removeMenuFromList(id: number){
  return this.http.delete('http://localhost:58979/api/MenuLists/'+id);
}

editMenu(name: string){

  //POTREBNO SPREMENITI GLEDE NA ZAHTEVE PB!
  //spodaj navedene vrstice spremenijo polje Menujev v string njihovih IDjev (npr. "12,13,14")
  //Iz zgoraj navedenih IDjev se tako razbere kateri menuji so bili mišljeni in se tako obdelajo v funkciji fetchMenus()
  let menuStr='';
  let count = 0;
  for(let menu of this.menuItems){
    if(count < this.menuItems.length-1){
      menuStr = menuStr.concat(menu.idCategory.toString()+',');
    }else{
      menuStr = menuStr.concat(menu.idCategory.toString());
    }
    count++;
  }
  const menuData = {id: this.selectedMenu.id, name: name, menuItems: menuStr};
  //--------------------------------------------------------------------------------------------

  this.http.put('http://localhost:58979/api/MenuLists/'+this.selectedMenu.id, menuData)
  .subscribe(()=>{
    this.fetchMenus();
  }, error=>{
    this.errorSub.next(error.message);
  });
  this.clearMenu();
}

clearMenu(){
  this.menuItems = [];
  this.menuItemsUpdated.next([...this.menuItems]);
}

}
