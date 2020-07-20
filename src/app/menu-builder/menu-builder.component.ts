import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MenuBuilderService } from './menu-builder.service';
import { Subscription } from 'rxjs';
import { Menu } from './menu-builder.model';
import { MenuList } from './menu-list/menu-list.model';
@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.css']
})
export class MenuBuilderComponent implements OnInit, OnDestroy {

  items: Menu[] = [];
  menuItems:Menu[] = [];
  private menuItemsSub: Subscription;
  private selectedMenuSub: Subscription;
  name: string = '';
  error = null;
  isFetching: boolean = false;
  selectedMenu: MenuList = null;
  editMode=false;
  invalidCheck=false;
  @ViewChild('menuName') inputName: ElementRef;

  constructor(private menuService: MenuBuilderService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.menuService.fetchCategorys().subscribe(categorys =>{
      this.items = categorys;
      this.menuService.updateListenerCategory(this.items);
      this.items = this.menuService.sortParentChild();
      this.menuService.fetchMenus();
      this.isFetching = false;
    }, error =>{
        this.error = error.message;
        this.isFetching = false;
    });

    this.menuItemsSub = this.menuService.getMenuItemsUpdatedListener().subscribe((menuItems: Menu[])=>{
          this.menuItems = menuItems;
          this.menuItems = this.menuService.sortParentChildMenuItems();
        });

    this.selectedMenuSub = this.menuService.getSelectedMenu().subscribe((selectedMenu: MenuList) =>{
        this.selectedMenu = selectedMenu;
        this.editMode = true;
        this.inputName.nativeElement.value=selectedMenu.name;
        this.menuItems = selectedMenu.menuItems;
    })
  }

   moveToMenuList(id: number){
    this.menuService.addItemToMenuList(id);
  }
  removeFromMenuList(id: number){
    this.menuService.removeItemFromMenuList(id);
    console.log(id);
  }

  moveWithChilds(id: number){
    this.menuItems = this.menuService.addItemWithChilds(id);
  }
  removeWithChilds(id: number){
    this.menuItems = this.menuService.removeItemWithChilds(id);
  }

  addMenu(menuName: string){
    if(this.menuItems.length < 1){
      this.error = 'None Menu items added!';
    }
    else if(!menuName){
      this.error = 'Please enter name of Menu!';
    }else
    {
      this.menuService.addMenuToList(menuName);
    }
    this.inputName.nativeElement.value = '';
  }

  editMenu(){
     this.menuService.editMenu(this.inputName.nativeElement.value);
     this.inputName.nativeElement.value = '';
     this.editMode = false;
  }

  onHandleError(){
    this.error = null;
  }

  onResetMenu(){
    this.inputName.nativeElement.value='';
    this.menuService.clearMenu();
  }

  ngOnDestroy(){
    this.menuItemsSub.unsubscribe();
    this.selectedMenuSub.unsubscribe();
  }

}
