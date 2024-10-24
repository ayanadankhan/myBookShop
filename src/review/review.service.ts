import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async addReview(userId: string, bookId: string, comment: string, rating: number): Promise<Review> {
    const newReview = new this.reviewModel({ user: userId, book: bookId, comment, rating });
    return newReview.save();
  }

  async getReviewsByBook(bookId: string) {
    return this.reviewModel.find({ book: bookId }).populate('user', 'name');  // Populate user details if needed
  }

  async modifyReview(userId: string, reviewId: string, comment: string, rating: number){
    const review = await this.reviewModel.findById(reviewId);
    if (review.user.toString() !== userId) {
      throw new UnauthorizedException('You can only modify your own reviews.');
    }
    review.comment = comment;
    review.rating = rating;
    return review.save();
  }

  async deleteReview(userId: string, reviewId: string): Promise<any> {
    const review = await this.reviewModel.findById(reviewId);
    if (review.user.toString() !== userId) {
      throw new UnauthorizedException('You can only delete your own reviews.');
    }
    return this.reviewModel.deleteOne({ _id: reviewId });
  }
}
