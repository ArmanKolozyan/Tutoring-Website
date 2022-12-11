import {addTutoringPost, getSingleTutoringPost, getTutoringPosts, getRegions} from "../Controllers/tutoringPosts.js"

export const tutoringPostRoutes = (app) => {
  app.get("/tutoringposts/", getTutoringPosts);
  app.get("/tutoringposts/:id", getSingleTutoringPost);
  app.post("/tutoringposts/", addTutoringPost);
  app.get("/tutoringpostRegion/:id", getRegions);
  //app.delete("/posts/:id", deleteTutoringPost);
  //app.put("/posts/:id", updateTutoringPost);
};
