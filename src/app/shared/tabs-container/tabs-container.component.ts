import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css'],
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
    new QueryList();

  constructor() {}

  ngAfterContentInit(): void {
    // console.log(this.tabs);
    const activeTabs = this.tabs?.filter((tab) => tab.active);
    if (!activeTabs || activeTabs.length == 0) {
      this.selectTab(undefined, this.tabs.first);
    }
  }

  selectTab($event: Event | undefined, tab: TabComponent) {
    $event?.preventDefault();
    this.tabs.forEach((t) => (t.active = false));
    tab.active = true;
  }
}
