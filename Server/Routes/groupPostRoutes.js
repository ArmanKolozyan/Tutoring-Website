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
  registrationCount
} from "../Controllers/GroupPosts.js";

export const groupPostRoutes = (app) => {


  /**
   * @api {get} /groupposts/ Get all group posts
   * @apiName getGroupPosts
   * @apiGroup GroupPosts
   * 
   */

  app.get("/groupposts/", getGroupPosts);


  /**
   * @api {get} /grouppostsAmount/ Get total number of group posts
   * @apiName groupsAmount
   * @apiGroup GroupPosts
   * 
   * @apiSuccess {Number} id NumberOfPosts id
   * 
   */
  
  app.get("/grouppostsAmount", getGroupPostsAmount)



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
  app.post("/groupposts/", addGroupPost);
  app.put("/groupposts/:id", updateGroupPost);
  app.delete("/groupposts/:id", deleteGroupPost);
  app.get("/searchGroupPosts/", findGroupPosts);
  app.post("/groupposts/registrations", signUpForSession);
  app.get("/groupposts/registrations/isSignedUp", is_signedUp);
  app.get("/groupposts/registrations/count", registrationCount);
};
