import {
  addPostReview,
  getSinglePostReviews,
  getAverageUserRating,
  getAveragePostRating,
} from "../Controllers/reviews.js";
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
  app.post(
    "/postReviews/",
    [
      check("id").notEmpty().withMessage("id cannot be empty "),
      check("title").notEmpty().withMessage("title cannot be empty "),
      check("description").notEmpty().withMessage("description cannot be empty"),
      check("nrOfStars").notEmpty().withMessage("nrOfStars cannot be empty "),
    ],
    addPostReview
  );

  /**
   * @api {get} /postReviews/:id Get reviews of the post with the given id
   * @apiName getSinglePostReviews
   * @apiGroup Reviews
   *
   * @apiParam {Number} id Post id
   *
   */
  app.get(
    "/postReviews/:id",
    param("id").notEmpty().withMessage("id of the post cannot be empty "),
    getSinglePostReviews
  );

  /**
   * @api {get} /userRatingAverage/ Get average rating of the posts of the given tutor_id
   * @apiName getAverageUserRating
   * @apiGroup Reviews
   *
   * @apiParam {Number} tutor_id Author id
   *
   */
  app.get(
    "/userRatingAverage/",
    query("tutor_id").notEmpty().withMessage("id of the tutor cannot be empty "),
    getAverageUserRating
  );

  /**
   * @api {get} /postRatingAverage/ Get average rating of the post with the given id
   * @apiName getAveragePostRating
   * @apiGroup Reviews
   *
   * @apiParam {Number} post_id Post id
   *
   */
  app.get(
    "/postRatingAverage/",
    query("post_id").notEmpty().withMessage("id of the tutor cannot be empty "),
    getAveragePostRating
  );
};
