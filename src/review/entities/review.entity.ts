import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Schema()
export class Review extends Document {
  @Prop({ type: String, ref: User.name, required: true })
  user: User;

  @Prop({ type: String, ref: Book.name, required: true })
  book: Book;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  rating: number; // Rating from 1 to 5
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
