import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StationListComponent } from './station-list/station-list.component';
import { StationItemComponent } from './station-item/station-item.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'stations/:sortOrder', component: StationListComponent },
  { path: 'station/:sortOrder/:code', component: StationItemComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
