import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesDetailComponent } from './notes-detail/notes-detail.component';
import { ThemesComponent } from './themes/themes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'notes/add', component: NotesDetailComponent },
  { path: 'notes/edit/:id', component: NotesDetailComponent },
  { path: 'themes', component: ThemesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
