import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'chat',
        loadChildren: () =>
          import('../../chat/feature/chat.module').then(
            (m) => m.ChatPageModule
          ),
      },
      {
        path: 'live',
        loadChildren: () =>
          import('../../live/feature/live.module').then(
            (m) => m.LivePageModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../../settings/feature/shell/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'live',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
