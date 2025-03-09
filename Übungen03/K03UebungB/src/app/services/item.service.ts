import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Item } from '../../shared/item';
import { ItemFactory } from '../../shared/Item-factory';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  fetchAllItems(): Promise<Item[]> {
    return lastValueFrom(
      this.http.get<Item[]>(`${this.url}/api/items`)
    );
  }

  fetchItemById(id: string): Promise<Item> {
    const upperCaseId = id.toUpperCase();
    return firstValueFrom(
      this.http.get<Item>(`${this.url}/api/items/${upperCaseId}`)
    );
  }

  async doesIdExist(id: string): Promise<boolean> {
    try {
      const tempItem = await firstValueFrom(
        this.http.get<Item>(`${this.url}/api/items/${id}`)
      );
      return !!tempItem && tempItem.id === id;
    } catch (error) {
      return false;
    }
  }

  addItem(item: Item): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.post<Item>(`${this.url}/api/items`, item, { observe: 'response' })
    );
  }

  modifyItem(item: Item): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.put<Item>(`${this.url}/api/items/${item.id}`, item, { observe: 'response' })
    );
  }

  removeItem(id: string): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.delete<Item>(`${this.url}/api/items/${id}`, { observe: 'response' })
    );
  }

  async deleteAllItems(): Promise<any> {
    const items = await this.fetchAllItems();
    if (items && items.length > 0) {
      const deleteRequests = items.map(item => this.removeItem(item.id));
      return Promise.all(deleteRequests);
    } else {
      return null;
    }
  }

  async generateAllItems(): Promise<HttpResponse<Item> | HttpErrorResponse> {
    try {
      await this.deleteAllItems();
      const newItems = ItemFactory.items();
      for (const newItem of newItems) {
        await firstValueFrom(
          this.http.post<Item>(`${this.url}/api/items`, newItem, { observe: 'response' })
        );
      }
      await this.router.navigate(['/']);
      return new HttpResponse<Item>();
    } catch (error: unknown) {
      return error as HttpErrorResponse;
    }
  }
}
