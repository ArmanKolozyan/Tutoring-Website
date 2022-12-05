import {addgroupPost, getSinglegroupPost, getgroupPosts} from "../Controllers/groupPosts.js"

export const groupPostRoutes = (app) => {
  app.get("/groupposts/", getgroupPosts);
  app.get("/groupposts/:id", getSinglegroupPost);
  app.post("/groupposts/", addgroupPost);
  //app.delete("/posts/:id", deletegroupPost);
  //app.put("/posts/:id", updategroupPost);
};
