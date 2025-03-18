import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteManagamentComponent } from './note-managament/note-managament.component';
import { HomeComponent } from './home/home.component';
import { NoteSortComponent } from './note-sort/note-sort.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'notes/manage', component: NoteManagamentComponent },
  { path: 'notes/overview', component: NoteSortComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
