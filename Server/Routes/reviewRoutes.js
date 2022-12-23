import { addPostReview, getSinglePostReviews, getAverageRating, getAveragePostRating } from "../Controllers/reviews.js";
import { check, param, query } from "express-validator";

export const reviewRoutes = (app) => {
  /**
   * @api {post} /postReviews/ Add a new review to a post
   * @apiName addPostReview
   * @apiGroup Reviews
   *
   * @apiParam {Number} id of the post
   * @apiParam {Number} title Title of the post
   * @apiParam {Number} description Description of the review
   * @apiParam {Number} nrOfStars Number of stars the user has given
   *
   */
  app.post("/postReviews/",[
    check("id").notEmpty().withMessage("title cannot be empty "),
    check("title").notEmpty().withMessage("title cannot be empty "),
    check("description").notEmpty().withMessage("choose whether the space is limited"),
    check("nrOfStars").notEmpty().withMessage("faculty cannot be empty "),
  ], addPostReview);


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
