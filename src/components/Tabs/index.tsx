import Tabs, { TabsProps } from "./Tabs";
import TabItem, { TabItemProps } from "./TabItem";
import { FC } from "react";

export type ITabsComponent = FC<TabsProps> & {
  TabItem: FC<TabItemProps>;
};

const TransTabs = Tabs as ITabsComponent;

TransTabs.TabItem = TabItem;

export default TransTabs;
