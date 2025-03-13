import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ItemService } from "../services/item.service"
import { Item } from '../../shared/item';
import { ItemFactory } from '../../shared/Item-factory';

@Component({
  selector: 'ub-item-create-all-new',
  templateUrl: './item-create-all.component.html',
  styleUrls: ['./item-create-all.component.scss']
})
export class ItemCreateAllComponent implements OnInit {
  public errorResponse!: HttpErrorResponse;
  public httpResponse!: HttpResponse<Item>;

  constructor(private http: HttpClient, private itemService: ItemService) { }

  ngOnInit(): void {
    this.generateItems()
  }

  generateItems(): void {
    this.itemService.generateAllItems();
  }
}
