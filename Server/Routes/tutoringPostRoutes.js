import {addTutoringPost, getSingleTutoringPost, getTutoringPosts, getRegions, updateTutoringPost, deleteTutoringPost} from "../Controllers/tutoringPosts.js"

export const tutoringPostRoutes = (app) => {
  app.get("/tutoringposts/", getTutoringPosts);
  app.get("/tutoringposts/:id", getSingleTutoringPost);
  app.post("/tutoringposts/", addTutoringPost);
  app.get("/tutoringpostRegion/:id", getRegions);
  app.put("/tutoringposts/:id", updateTutoringPost);
  app.delete("/tutoringposts/:id", deleteTutoringPost);
  //app.put("/posts/:id", updateTutoringPost);
};
