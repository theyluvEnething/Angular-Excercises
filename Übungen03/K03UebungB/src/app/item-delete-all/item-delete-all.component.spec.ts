import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'ub-delete-all-articles',
  templateUrl: './item-delete-all.component.html',
  styleUrls: ['./item-delete-all.component.scss']
})
export class DeleteAllArticlesComponent implements OnInit {
  error: HttpErrorResponse | null = null;
  response: HttpResponse<any> | null = null;

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit() {}

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
