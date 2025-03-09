import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../../shared/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ub-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['img', 'identifier', 'desc', 'qty', 'buyPrice', 'sellPrice', 'launch'];
  items: Item[] = [];
  private routeSubscription!: Subscription;

  constructor(
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadItems();
    // this.routeSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => this.loadItems());
  }

  async loadItems(): Promise<void> {
    try {
      this.items = await this.itemService.fetchAllItems();
      console.log("Got Items:", this.items)
    } catch {
      this.snackBar.open('Fehler beim Laden der Daten', 'Schließen', { duration: 3000 });
    }
  }

  openEdit(itemId: string): void {
    console.log("Navigating to ./items/" + itemId + ".")
    this.router.navigate(['/items', itemId]);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
