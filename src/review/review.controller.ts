import { Controller, Post, Body, Param, Delete, Put, UseGuards, Req, Get } from '@nestjs/common';
import { ReviewsService } from './review.service';
import { AuthGuard } from '../auth/auth.gaurd';  // Use the correct auth guard
import { Request } from 'express';  // Import Express Request

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':bookId')
  @UseGuards(AuthGuard)
  async addReview(
    @Param('bookId') bookId: string,
    @Body() body: { comment: string; rating: number },
    @Req() req: Request,
  ) {
    const user: any = req.user;
   
    return this.reviewsService.addReview(user._id, bookId, body.comment, body.rating);
  }

  @Get(':bookId')
  async getReviewsByBook(
    @Param('bookId') bookId: string
  ) {
    return this.reviewsService.getReviewsByBook(bookId);
  }
  // Updated modifyReview method
  @Put(':reviewId')
  async modifyReview(
    @Param('reviewId') reviewId: string,
    @Body() body: { comment: string; rating: number },
    @Req() req: Request,
  ) {
    const user: any = req.user;  // Get the authenticated user
    console.log(req.user);
    return this.reviewsService.modifyReview(user._id, reviewId, body.comment, body.rating);
  }

  // Updated deleteReview method
  @Delete(':reviewId')
  @UseGuards(AuthGuard)
  async deleteReview(
    @Param('reviewId') reviewId: string,
    @Req() req: Request,
  ) {
    const user: any = req.user;  // Get the authenticated user
    console.log(req.user);
    return this.reviewsService.deleteReview(user._id, reviewId);
  }
}
