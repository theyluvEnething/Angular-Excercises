import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../services/book-store.service';
import { Book } from 'src/shared/book';
import { FormGroup } from '@angular/forms';
import { BookFactory } from 'src/shared/book-factory';

@Component({
  selector: 'ua-book-store-service-test',
  templateUrl: './book-store-service-test.component.html',
  styleUrls: ['./book-store-service-test.component.scss']
})
export class BookStoreServiceTestComponent implements OnInit {

  BookFactory = BookFactory;
  lastCreatedBookIsbn: string = "";
  response: any;

  constructor(private bookStoreService: BookStoreService) {}

  ngOnInit() {}


  resetStore(): void {
    this.bookStoreService.resetStore().subscribe(res => {
      this.response = res
    }, err =>  {
      console.log(err)
      this.response = err
  });
    
  }

  deleteBook(isbn: string): void {
    this.bookStoreService.deleteBook(isbn).subscribe(res => {
      this.response = res
    }, err => {
      console.log(err)
      this.response = err
    })
  }

  getAllBooks(): Book[] {
    this.bookStoreService.getAllBooks().subscribe(res => {
      this.response = res
    }, err => {
      console.log(err)
      this.response = err
    });
    return []
  }

  getBook(isbn: string): void {
    this.bookStoreService.getBook(isbn).subscribe(res => {
      this.response = res
    }, err => {
      console.log(err)
      this.response = err
    });
  }

  getAllBooksSearchTerm(searchTerm: string): void {
    this.bookStoreService.getAllBooksSearchTerm(searchTerm).subscribe(res => {
      this.response = res
    }, err => {
      console.log(err)
      this.response = err
    });
  }

  createBook(book: Book): void {
    this.bookStoreService.createBook(book).subscribe(res => {
      this.lastCreatedBookIsbn = book.isbn
      this.response = res
    }, err => {
      console.log(err)
      this.response = err
    });
  } 

  
  createBookIsbn(): void {
    let randomBook = BookFactory.random()
    randomBook.isbn = this.lastCreatedBookIsbn;

    this.bookStoreService.createBook(randomBook).subscribe(res => {
      this.response = res
    }, err => {
      console.log(err)
      this.response = err
    });
  } 



  updateBook(book: Book): void {
    this.bookStoreService.updateBook(book).subscribe(res => {
      this.response = res
    }, err => {
      console.log(err)
      this.response = err
    });
  }

  checkBook(isbn: string): void {
    this.bookStoreService.checkBook(isbn).subscribe(res => {
      this.response = res
    }, err => {
      console.log(err)
      this.response = err
    });
  }
}