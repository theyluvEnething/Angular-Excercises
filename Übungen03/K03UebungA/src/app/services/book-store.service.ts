import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/shared/book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private apiUrl = 'http://localhost:3000/books';
  constructor(private http: HttpClient) { }

  resetStore(): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/books`;
    return this.http.delete<any>(url, { observe: 'response' });
  }
  createBook(book: Book): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl, book, { observe: 'response' });
  }

  deleteBook(isbn: string): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/${isbn}`;
    return this.http.delete<any>(url, { observe: 'response' });
  }

  updateBook(book: Book): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/${book.isbn}`;
    return this.http.put<any>(url, book, { observe: 'response' });
  }

  checkBook(isbn: string): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/${isbn}`;
    return this.http.get<any>(url, { observe: 'response' });
  }

  getAllBooks(): Observable<HttpResponse<any>> {
    return this.http.get<Book[]>(this.apiUrl, { observe: 'response' });
  }

  getAllBooksSearchTerm(searchTerm: string): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/search/${encodeURIComponent(searchTerm)}`;
    return this.http.get<Book[]>(url, { observe: 'response' });
  }
  
  getBook(isbn: string): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/${isbn}`;
    return this.http.get<Book>(url, { observe: 'response' });
  }
}
