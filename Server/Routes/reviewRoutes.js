import { addPostReview, getSinglePostReviews, getAverageRating, getAveragePostRating } from "../Controllers/reviews.js";

export const reviewRoutes = (app) => {
  /**
   * @api {post} /postReviews/ Get all post reviews
   * @apiName addPostReview
   * @apiGroup Reviews
   *
   */
  app.post("/postReviews/", addPostReview);

  /**
   * @api {get} /postReviews/:id Get reviews of the post with the given id
   * @apiName getSinglePostReviews
   * @apiGroup Reviews
   *
   * @apiParam {Number} id Post id
   *
   *
   */
  app.get("/postReviews/:id", getSinglePostReviews);


    /**
   * @api {get} /postReviewsRating/ Get average rating of the posts of the given author_id
   * @apiName getAverageRating
   * @apiGroup Reviews
   *
   * @apiParam {Number} id Author id
   *
   *
   */
  app.get("/postReviewsRating/", getAverageRating);

  app.get("/postRatingAverage/", getAveragePostRating);
};
