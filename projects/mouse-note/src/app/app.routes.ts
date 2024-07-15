import { Routes } from '@angular/router';
import { MainViewComponent } from './Views/main-view/main-view.component';
import { SettingsViewComponent } from './Views/settings-view/settings-view.component';

export const routes: Routes = [
    {path: '', component: MainViewComponent},
    {path:'settings', component: SettingsViewComponent}
];
