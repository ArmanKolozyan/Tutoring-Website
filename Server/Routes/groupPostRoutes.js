import {
  addGroupPost,
  getSingleGroupPost,
  getGroupPosts,
  updateGroupPost,
  deleteGroupPost,
  findGroupPosts,
  getGroupPostsAmount,
  signUpForSession,
  is_signedUp,
  registrationCount,
} from "../Controllers/GroupPosts.js";
import { check, param, query } from "express-validator";

export const groupPostRoutes = (app) => {
  /**
   * @api {get} /groupposts/ Get all group posts
   * @apiName getGroupPosts
   * @apiGroup GroupPosts
   */
  app.get("/groupposts", getGroupPosts);

  /**
   * @api {get} /grouppostsAmount/ Get total number of group posts
   * @apiName groupsAmount
   * @apiGroup GroupPosts
   *
   * @apiSuccess {Number} id NumberOfPosts 
   *
   */

  app.get(
    "/groupposts/amount",
    param("id").notEmpty().withMessage("id of the user cannot be empty "),
    getGroupPostsAmount
  );

  /**
   * @api {get} /groupposts/:id Get group post
   * @apiName getGroupPost
   * @apiGroup GroupPosts
   *
   * @apiParam {Number} id Post id
   *
   *
   */
  app.get("/groupposts/:id", getSingleGroupPost);

  /**
   * @api {post} /groupposts/ Add new group post
   * @apiName addGroupPost
   * @apiGroup GroupPosts
   *
   * @apiParam {String} title Title of the event
   * @apiParam {Boolean} limited Whether the space is limited or not
   * @apiParam {String} space Maximum number of members the event can have.
   * @apiParam {Number} faculty Faculty
   * @apiParam {Number} course Course
   * @apiParam {Number} free Is the event free?
   * @apiParam {Number} price What is the price of the event?
   * @apiParam {DateTime} dateAndTime When will the event take place (date and time), format: YYYY-MM-DD HH:MM:SS
   * @apiParam {String} desc Description of the event.
   * @apiParam {String} location Where will the event take place?
   *
   *
   */
  app.post(
    "/groupposts/",
    [
      check("title").notEmpty().withMessage("title cannot be empty "),
      check("limited").notEmpty().withMessage("choose whether the space is limited"),
      check("faculty").notEmpty().withMessage("faculty cannot be empty "),
      check("course").notEmpty().withMessage("course cannot be empty "),
      check("free").notEmpty().withMessage("whether the event is free cannot be empty "),
      check("dateAndTime").notEmpty().withMessage("date and time cannot be empty "),
      check("desc").notEmpty().withMessage("description cannot be empty "),
      check("location").notEmpty().withMessage("location cannot be empty "),
    ],
    addGroupPost
  );

  /**
   * @api {put} /groupposts/ Update group post
   * @apiName updateGroupPost
   * @apiGroup GroupPosts
   *
   * @apiParam {String} title Title of the event
   * @apiParam {Boolean} limited Whether the space is limited or not
   * @apiParam {String} space Maximum number of members the event can have
   * @apiParam {Number} faculty Faculty
   * @apiParam {Number} course Course
   * @apiParam {Number} free Is the event free?
   * @apiParam {Number} price What is the price of the event?
   * @apiParam {DateTime} dateAndTime When will the event take place (date and time), format: YYYY-MM-DD HH:MM:SS
   * @apiParam {String} desc Description of the event
   * @apiParam {String} location Where will the event take place?
   *
   */
  app.put(
    "/groupposts/:id",
    [
      param("id").notEmpty().withMessage("the post id annot be empty "),
      check("title").notEmpty().withMessage("title cannot be empty "),
      check("limited").notEmpty().withMessage("choose whether the space is limited"),
      check("faculty").notEmpty().withMessage("faculty cannot be empty "),
      check("course").notEmpty().withMessage("course cannot be empty "),
      check("free").notEmpty().withMessage("whether the event is free cannot be empty "),
      check("dateAndTime").notEmpty().withMessage("date and time cannot be empty "),
      check("desc").notEmpty().withMessage("description cannot be empty "),
      check("location").notEmpty().withMessage("location cannot be empty "),
    ],
    updateGroupPost
  );

  /**
   * @api {delete} /groupposts/ Delete group post
   * @apiName deleteGroupPost
   * @apiGroup GroupPosts
   *
   * @apiParam {Number} id id of the post
   *
   */
  app.delete("/groupposts/:id", param("id").notEmpty().withMessage("id of the post cannot be empty "), deleteGroupPost);

  /**
   * @api {get} /searchGroupPosts/ Search for group posts
   * @apiName findGroupPosts
   * @apiGroup GroupPosts
   *
   * @apiParam {String} keyword Course of the post
   * @apiParam {String} course Faculty of the post
   * @apiParam {String} field Description of the post
   * @apiParam {Boolean} free Whether the event is free
   * @apiParam {Boolean} noRegistration Whether no registration is needed
   * @apiParam {Number} startIdx Number of years experience the author has with teaching the course
   * @apiParam {Number} endIdx What is the price of the event?
   *
   */
  app.get("/searchGroupPosts/", findGroupPosts);

  /**
   * @api {post} /groupposts/registrations Sign up for session
   * @apiName signUpForSession
   * @apiGroup GroupPosts
   *
   * @apiParam {Number} student_id id of the student
   * @apiParam {Number} post_id id of the post
   *
   */
  app.post(
    "/groupposts/registrations",
    [
      check("student_id").notEmpty().withMessage("the student id cannot be empty "),
      check("post_id").notEmpty().withMessage("the post id cannot be empty "),
    ],
    signUpForSession
  );

    /**
   * @api {get} /groupposts/isSignedUp Check whether the given student is signed up for the given session
   * @apiName is_signedUp
   * @apiGroup GroupPosts
   *
   * @apiParam {Number} student_id id of the student
   * @apiParam {Number} post_id id of the post
   *
   */
  app.get("/groupposts/registrations/isSignedUp", [
    query("student_id").notEmpty().withMessage("the student id cannot be empty "),
    query("post_id").notEmpty().withMessage("the post id cannot be empty "),
  ], is_signedUp);

      /**
   * @api {get} /groupposts/registrations/count Get the number of registrations for the event
   * @apiName registrationCount
   * @apiGroup GroupPosts
   *
   * @apiParam {Number} post_id id of the post
   *
   */
  app.get("/groupposts/registrations/count",
  query("post_id").notEmpty().withMessage("the post id cannot be empty "),
  registrationCount);
};
