import {addPostReview} from "../Controllers/reviews.js"

export const reviewRoutes = (app) => {
    app.post("/reviews/", addPostReview);
    // app.get("/groupposts/:id", getSinglegroupPost);
    // app.post("/groupposts/", addgroupPost);
    // app.delete("/posts/:id", deletegroupPost);
    // app.put("/posts/:id", updategroupPost);
  };