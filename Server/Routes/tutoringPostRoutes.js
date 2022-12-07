import {addTutoringPost, getSingleTutoringPost, getTutoringPosts} from "../Controllers/tutoringPosts.js"

export const tutoringPostRoutes = (app) => {
  app.get("/tutoringposts/", getTutoringPosts);
  app.get("/tutoringposts/:id", getSingleTutoringPost);
  app.post("/tutoringposts/", addTutoringPost);
  //app.delete("/posts/:id", deleteTutoringPost);
  //app.put("/posts/:id", updateTutoringPost);
};
