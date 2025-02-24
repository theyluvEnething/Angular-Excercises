  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { HomeComponent } from './home/home.component';
  import { StationListComponent } from './station-list/station-list.component';
  import { StationItemComponent } from './station-item/station-item.component';
import { AppComponent } from './app.component';

  const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'stations/:sortOrder', component: StationListComponent },
    { path: 'stations/:sortOrder/:code', component: StationItemComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home',  pathMatch: 'full' } // wildcard route
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
