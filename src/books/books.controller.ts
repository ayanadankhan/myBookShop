import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity'; // Ensure you import your Book entity correctly
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks() {
    return this.booksService.findAll();
  }

  @Get(':isbn')
  async getBookByISBN(@Param('isbn') isbn: string) {
    return this.booksService.findByISBN(isbn);
  }

  @Get('/author/:author')
  async getBooksByAuthor(@Param('author') author: string) {
    return this.booksService.findByAuthor(author);
  }

  @Get('/title/:title')
  async getBooksByTitle(@Param('title') title: string) {
    return this.booksService.findByTitle(title);
  }

  @Post()
  async createBook(@Body() bookData: Book) {
    return this.booksService.create(bookData);
  }
  @Post('bulk') // New endpoint for bulk creation
  async createManyBooks(@Body() createBookDtos: CreateBookDto[]) {
    return this.booksService.createMany(createBookDtos);
  }
}
