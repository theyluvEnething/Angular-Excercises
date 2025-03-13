import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ub-item-list',
  templateUrl: './item-delete-all.component.html',
  styleUrls: ['./item-delete-all.component.scss']
})
export class ItemDeleteAllComponent implements OnInit {

  response: any;
  error: HttpErrorResponse | undefined;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {}

  deleteAllArticles() {
    this.itemService.deleteAllItems()
      .then((res) => {
        this.response = res;
        return this.router.navigate(['/']);
      })
      .catch((err) => {
        this.error = err as HttpErrorResponse;
      });
  }
}
