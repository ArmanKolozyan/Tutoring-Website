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
  app.get("/groupposts/", getGroupPosts);
  app.get("/grouppostsAmount", getGroupPostsAmount)
  app.get("/groupposts/:id", getSingleGroupPost);
  app.post("/groupposts/", addGroupPost);
  app.put("/groupposts/:id", updateGroupPost);
  app.delete("/groupposts/:id", deleteGroupPost);
  app.get("/searchGroupPosts/", findGroupPosts);
  app.post("/groupposts/registrations", signUpForSession);
  app.get("/groupposts/registrations/isSignedUp", is_signedUp);
  app.get("/groupposts/registrations/count", registrationCount);
};
