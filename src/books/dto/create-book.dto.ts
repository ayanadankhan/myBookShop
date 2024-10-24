import { IsNotEmpty, IsString, IsISBN } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be a string' })
  author: string;

  @IsNotEmpty({ message: 'ISBN is required' })
  @IsISBN(13, { message: 'ISBN must be a valid ISBN-13' }) // Adjust for ISBN-10 or 13 as needed
  isbn: string;
}
