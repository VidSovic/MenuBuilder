import { Menu } from '../menu-builder.model';

export interface MenuList{
  id: number;
  name: string;
  menuItems: Menu[];
}
