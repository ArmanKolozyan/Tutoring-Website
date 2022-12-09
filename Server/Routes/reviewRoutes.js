import {addPostReview, getSinglePostReviews} from "../Controllers/reviews.js"

export const reviewRoutes = (app) => {
    app.post("/postReviews/", addPostReview);
    app.get("/postReviews/:id", getSinglePostReviews);
    // app.post("/groupposts/", addgroupPost);
    // app.delete("/posts/:id", deletegroupPost);
    // app.put("/posts/:id", updategroupPost);
  };