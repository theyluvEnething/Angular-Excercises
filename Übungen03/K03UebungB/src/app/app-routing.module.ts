import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemDeleteAllComponent } from './item-delete-all/item-delete-all.component';
import { ItemCreateAllComponent } from './item-create-all/item-create-all.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
  { path: 'itemList', component: ItemListComponent },
  { path: 'item/new', component: ItemCreateComponent },
  { path: 'deleteItems', component: ItemDeleteAllComponent },
  { path: 'regenerateItems', component: ItemCreateAllComponent },
  { path: 'items/:id', component: ItemDetailComponent },
  { path: '', redirectTo: 'itemList', pathMatch: 'full' },
  { path: '**', redirectTo: 'itemList' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
