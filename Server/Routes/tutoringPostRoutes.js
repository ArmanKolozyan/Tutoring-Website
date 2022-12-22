import {addTutoringPost, getSingleTutoringPost, getTutoringPosts, getRegions, updateTutoringPost, deleteTutoringPost, findTutoringPosts, getTutoringPostsAmount} from "../Controllers/tutoringPosts.js"

export const tutoringPostRoutes = (app) => {
    /**
   * @api {get} /tutoringposts/ Get all tutoring posts
   * @apiName getTutoringPosts
   * @apiGroup TutoringPosts
   *
   */
  app.get("/tutoringposts/", getTutoringPosts);
      /**
   * @api {get} /tutoringpostsAmount/ Get amount of tutoring posts
   * @apiName getTutoringPostsAmount
   * @apiGroup TutoringPosts
   *
   */
  app.get("/tutoringpostsAmount/", getTutoringPostsAmount);
        /**
   * @api {get} /tutoringpostsAmount/ Get tutoring post with the given id 
   * @apiName getSingleTutoringPost
   * @apiGroup TutoringPosts
   * 
   * @apiParam {Number} id Post id
   *
   */
  app.get("/tutoringposts/:id", getSingleTutoringPost);

          /**
   * @api {post} /tutoringposts/ Add tutoring post 
   * @apiName addTutoringPost
   * @apiGroup TutoringPosts
   * 
   * @apiParam {String} course Course of the post  
   * @apiParam {String} field Faculty of the post.
   * @apiParam {String} desc Description of the post.
   * @apiParam {DATETIME} date Publishing date and time of the post.
   * @apiParam {Number} exp Number of years experience the author has with teaching the course.
   * @apiParam {Number} price What is the price of the event? 
   * @apiParam {Number} test Does the teacher offer a free test 
   *
   */
  app.post("/tutoringposts/", addTutoringPost);
  app.get("/tutoringpostRegion/:id", getRegions);
  app.put("/tutoringposts/:id", updateTutoringPost);
  app.delete("/tutoringposts/:id", deleteTutoringPost);
  app.get("/searchTutoringPosts/", findTutoringPosts)
  //app.put("/posts/:id", updateTutoringPost);
};
