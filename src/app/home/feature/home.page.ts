import { Component, ViewChild } from '@angular/core';
import { IonTabs, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @ViewChild(IonTabs, { static: true }) private ionTabs: IonTabs;

  tabs = [
    {
      name: 'chat',
      label: 'Chat',
      icon: 'chatbox-outline',
      iconActive: 'chatbox',
    },
    {
      name: 'live',
      label: 'Live',
      icon: 'pulse-outline',
      iconActive: 'pulse',
    },
    {
      name: 'settings',
      label: 'Settings',
      icon: 'settings-outline',
      iconActive: 'settings',
    },
  ];

  selectedTab = this.tabs[1].name;

  constructor(private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.ionTabs.outlet.canGoBack()) {
        if (this.selectedTab !== this.tabs[1].name) {
          this.ionTabs.select(this.tabs[1].name);
        } else {
          (navigator as any).app.exitApp();
        }
      }
    });
  }

  tabClicked(e: { tab: string }) {
    this.selectedTab = e.tab;
  }
}
