import {
  addTutoringPost,
  getSingleTutoringPost,
  getTutoringPosts,
  getRegions,
  updateTutoringPost,
  deleteTutoringPost,
  findTutoringPosts,
  getTutoringPostsAmount,
} from "../Controllers/tutoringPosts.js";
import { check, param, query } from "express-validator";

export const tutoringPostRoutes = (app) => {
  /**
   * @api {get} /tutoringposts/ Get all tutoring posts
   * @apiName getTutoringPosts
   * @apiGroup TutoringPosts
   *
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data Data containing the return value
   * @apiSuccess {Object[]} data List of the posts.
   * @apiSuccess {Number} result.data.id id of the post
   * @apiSuccess {String} result.data.course Course of the post
   * @apiSuccess {String} result.data.field Faculty of the post
   * @apiSuccess {String} result.data.desc Description of the post
   * @apiSuccess {DATETIME} result.data.date Publishing date and time of the post
   * @apiSuccess {Number} result.data.exp Number of years experience the author has with teaching the course
   * @apiSuccess {Number} result.data.price What is the price of the event?
   * @apiSuccess {Boolean} result.data.test Does the teacher offer a free test
   *
   */
  app.get("/tutoringposts", getTutoringPosts);

  /**
   * @api {get} /tutoringposts/smount Get amount of tutoring posts
   * @apiName getTutoringPostsAmount
   * @apiGroup TutoringPosts
   *
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data Data containing the return value
   * @apiSuccess {Number} result.data.amount Amount of posts
   */
  app.get("/tutoringposts/amount", getTutoringPostsAmount);

  /**
   * @api {get} /tutoringposts/amount Get tutoring post with the given id
   * @apiName getSingleTutoringPost
   * @apiGroup TutoringPosts
   *
   * @apiParam {Number} id Post id
   *
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data Data containing the return value
   * @apiSuccess {Number} result.data.id id of the post
   * @apiSuccess {String} result.data.course Course of the post
   * @apiSuccess {String} result.data.field Faculty of the post
   * @apiSuccess {String} result.data.desc Description of the post
   * @apiSuccess {DATETIME} result.data.date Publishing date and time of the post
   * @apiSuccess {Number} result.data.exp Number of years experience the author has with teaching the course
   * @apiSuccess {Number} result.data.price What is the price of the event?
   * @apiSuccess {Boolean} result.data.test Does the teacher offer a free test
   * @apiSuccess {Boolean} test Does the teacher offer a free test
   */
  app.get(
    "/tutoringposts/:id",
    param("id").notEmpty().withMessage("id of the user cannot be empty "),
    getSingleTutoringPost
  );

  /**
   * @api {post} /tutoringposts/ Add tutoring post
   * @apiName addTutoringPost
   * @apiGroup TutoringPosts
   *
   * @apiParam {String} course Course of the post
   * @apiParam {String} field Faculty of the post
   * @apiParam {String} desc Description of the post
   * @apiParam {DATETIME} date Publishing date and time of the post
   * @apiParam {Number} exp Number of years experience the author has with teaching the course
   * @apiParam {Number} price What is the price of the event?
   * @apiParam {Boolean} test Does the teacher offer a free test
   *
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data Data containing the return value
   * @apiSuccess {Number} result.data.post_id Id of the inserted post
   */
  app.post(
    "/tutoringposts",
    [
      check("course").notEmpty().withMessage("course cannot be empty "),
      check("field").notEmpty().withMessage("field of study cannot be empty "),
      check("desc").notEmpty().withMessage("description cannot be empty "),
      check("date").notEmpty().withMessage("description cannot be empty "),
      check("exp").notEmpty().withMessage("years of experience cannot be empty "),
      check("price").notEmpty().withMessage("price cannot be empty "),
      check("test").notEmpty().withMessage("whether test session is available cannot be empty "),
    ],
    addTutoringPost
  );

  /**
   * @api {get} /tutoringposts/regions Get tutoring post with the given id
   * @apiName getRegions
   * @apiGroup TutoringPosts
   *
   * @apiParam {Number} id Post id
   * 
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data Data containing the return value
   * @apiSuccess {Object[]} data List of the regions.
   * @apiSuccess {Number} result.data.id id of the region
   * @apiSuccess {Number} result.data.post_id id of the post
   * @apiSuccess {Number} result.data.latitude Latitiude of the circle
   * @apiSuccess {Number} result.data.longitude Longitude of the circle
   * @apiSuccess {Number} result.data.radius Radius of the circle
   */
  app.get(
    "/tutoringposts/regions/:id",
    param("id").notEmpty().withMessage("id of the user cannot be empty "),
    getRegions
  );

  /**
   * @api {put} /tutoringposts/ Update tutoring post
   * @apiName updateTutoringPost
   * @apiGroup TutoringPosts
   *
   * @apiParam {Number} id id of the post
   * @apiParam {String} course Course of the post
   * @apiParam {String} field Faculty of the post
   * @apiParam {String} desc Description of the post
   * @apiParam {DATETIME} date Publishing date and time of the post
   * @apiParam {Number} exp Number of years experience the author has with teaching the course
   * @apiParam {Number} price What is the price of the event?
   * @apiParam {Number} test Does the teacher offer a free test
   *
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data Data containing the return value
   * @apiSuccess {Number} data id of the updated post
   */
  app.put(
    "/tutoringposts/:id",
    [
      param("id").notEmpty().withMessage("the post id annot be empty "),
      check("course").notEmpty().withMessage("course cannot be empty "),
      check("field").notEmpty().withMessage("field of study cannot be empty "),
      check("desc").notEmpty().withMessage("description cannot be empty "),
      check("exp").notEmpty().withMessage("years of experience cannot be empty "),
      check("price").notEmpty().withMessage("price cannot be empty "),
      check("test").notEmpty().withMessage("whether test session is available cannot be empty "),
    ],
    updateTutoringPost
  );

  /**
   * @api {delete} /tutoringposts/ Delete tutoring post
   * @apiName deleteTutoringPost
   * @apiGroup TutoringPosts
   *
   * @apiParam {Number} id id of the post
   *
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data Data containing the return value: here always empty   
   * */
  app.delete(
    "/tutoringposts/:id",
    param("id").notEmpty().withMessage("id of the user cannot be empty "),
    deleteTutoringPost
  );

  /**
   * @api {get} /tutoringpostsSearch/ Search for tutoring posts
   * @apiName findTutoringPosts
   * @apiGroup TutoringPosts
   *
   * @apiParam {String} keyword Course of the post
   * @apiParam {String} course Faculty of the post
   * @apiParam {String} field Description of the post
   * @apiParam {Boolean} freeTest Whether a free test event is offered
   * @apiParam {Number} startIdx Number of years experience the author has with teaching the course
   * @apiParam {Number} endIdx What is the price of the event?
   *
   * @apiSuccess {Object} result Object containing (possibly empty) data and a (possibly empty) message
   * @apiSuccess {String} result.message Message containing the return message (error)
   * @apiSuccess {Object} result.data Data containing the return value
   * @apiSuccess {Object[]} data List of the posts.
   * @apiSuccess {Number} result.data.id id of the post
   * @apiSuccess {String} result.data.course Course of the post
   * @apiSuccess {String} result.data.field Faculty of the post
   * @apiSuccess {String} result.data.desc Description of the post
   * @apiSuccess {DATETIME} result.data.date Publishing date and time of the post
   * @apiSuccess {Number} result.data.exp Number of years experience the author has with teaching the course
   * @apiSuccess {Number} result.data.price What is the price of the event?
   * @apiSuccess {Boolean} result.data.test Does the teacher offer a free test
   */

  app.get("/tutoringpostsSearch", findTutoringPosts); // manual validation happens in findTutoringPosts
};
