import { FC } from "react";
import Menu, { MenuProps } from "./Menu";
import SubMenu, { subMenuProps } from "./SubMenu";
import MenuItem, { MenuItemProps } from "./MenuItem";

export type IMenuComponent = FC<MenuProps> & {
  MenuItem: FC<MenuItemProps>;
  SubMenu: FC<subMenuProps>;
};
const TransMenu = Menu as IMenuComponent;

TransMenu.MenuItem = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
