import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findByISBN(isbn: string): Promise<Book> {
    return this.bookModel.findOne({ isbn }).exec();
  }

  async findByAuthor(author: string): Promise<Book[]> {
    return this.bookModel.find({ author }).exec();
  }

  async findByTitle(title: string): Promise<Book[]> {
    return this.bookModel.find({ title }).exec();
  }

  async create(bookData: Book): Promise<Book> {
    const newBook = new this.bookModel(bookData); // Create a new instance of the book model
    return newBook.save(); // Save the book to the database
  }

  async createMany(createBookDtos: CreateBookDto[]): Promise<Book[]> {
    const books = createBookDtos.map(dto => new this.bookModel(dto));
    return this.bookModel.insertMany(books); // Use insertMany for bulk creation
  }
  
  }

