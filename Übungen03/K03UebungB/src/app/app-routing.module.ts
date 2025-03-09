import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemDeleteAllComponent } from './item-delete-all/item-delete-all.component';
import { ItemCreateAllComponent } from './item-create-all/item-create-all.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
  { path: 'ItemList', component: ItemListComponent },
  { path: 'Item/new', component: ItemCreateComponent },
  { path: 'DeleteItems', component: ItemDeleteAllComponent },
  { path: 'RegenerateItems', component: ItemCreateAllComponent },
  { path: 'Item/:id', component: ItemDetailComponent },
  { path: '', redirectTo: 'ItemList', pathMatch: 'full' },
  { path: '**', redirectTo: 'ItemList' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
