import {addGroupPost, getSingleGroupPost, getGroupPosts, updateGroupPost, deleteGroupPost, findGroupPosts} from "../Controllers/GroupPosts.js"

export const groupPostRoutes = (app) => {
  app.get("/groupposts/", getGroupPosts);
  app.get("/groupposts/:id", getSingleGroupPost);
  app.post("/groupposts/", addGroupPost);
    app.put("/groupposts/:id", updateGroupPost);
  app.delete("/groupposts/:id", deleteGroupPost);
  app.get("/searchGroupPosts/", findGroupPosts)
};
