import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MenuBuilderService } from '../menu-builder.service';
import { Subscription } from 'rxjs';
import { MenuList } from './menu-list.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {

  menus: MenuList[] = [];
  private menusSub: Subscription;
  private errorSub: Subscription;
  error = null;
  isLoading=false;

  constructor(private menuService: MenuBuilderService) {}

  ngOnInit(): void {
    this.menusSub = this.menuService.getMenusUpdatedListener().subscribe((menus: MenuList[])=>{
      this.menus = menus;
    });
    this.errorSub = this.menuService.getError().subscribe((error:string) =>{
      this.error = error;
    })
  }

  onSelectMenu(id: number){
    this.menuService.onSelectMenu(id);
  }

  removeMenu(id: number){
    this.isLoading = true;
    this.menus = this.menus.filter(menus => menus.id !== id);
    this.menuService.removeMenuFromList(id).subscribe(()=>{
      this.menuService.updateListenerMenu(this.menus);
      this.isLoading = false;
    },error =>{
      this.error = error.message;
      this.isLoading = false;
    });
    };

    onHandleError(){
      this.error = null;
    }

    ngOnDestroy(){
      this.menusSub.unsubscribe();
      this.errorSub.unsubscribe();
    }
  }
