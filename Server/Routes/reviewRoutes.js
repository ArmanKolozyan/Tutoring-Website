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
   * @apiParam {Number} title Title of the post
   * @apiParam {Number} description Description of the review
   * @apiParam {Number} nrOfStars Number of stars the user has given
   *
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data data containing the return value: here always empty
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
   * @apiSuccess {Result[]} message-data Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data data containing the return value
   * @apiSuccess {Number} result.data.id  id of the post
   * @apiSuccess {Number} result.data.title Title of the post
   * @apiSuccess {Number} result.data.description Description of the review
   * @apiSuccess {Number} result.data.nrOfStars Number of stars the user has given
   * @apiSuccess {Date} result.data.date Date and time of the written review
   * @apiSuccess {Number} result.data.authorid id of the author
   * @apiSuccess {Number} result.data.postid id of the post
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
   * @apiSuccess {Result[]} message-data Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Number} result.data Average rating of the user
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
   * @apiSuccess {Result[]} message-data Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Number} result.data Average rating of the post
   */
  app.get(
    "/postRatingAverage/",
    query("post_id").notEmpty().withMessage("id of the tutor cannot be empty "),
    getAveragePostRating
  );
};
