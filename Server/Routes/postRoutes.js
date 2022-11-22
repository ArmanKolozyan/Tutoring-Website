import {addPost, getSinglePost} from "../Controllers/posts.js"

export const postRoutes = (app) => {
  //app.get("/posts/", getPosts);
  app.get("/posts/:id", getSinglePost);
  app.post("/posts/", addPost);
  //app.delete("/posts/:id", deletePost);
  //app.put("/posts/:id", updatePost);
};
