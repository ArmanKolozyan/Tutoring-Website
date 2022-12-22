import Separator from "../components/Separator";
import { useState, useEffect } from "react";
import axios from "axios";
import ReviewsList from "./ReviewsList";

/**
 * COMPONENT FOR VIEWING ALL THE REVIEWS OF A SINGLE POST
 * BY PROVIDING AS ARGUMENT THE ID OF THE BEST.
 */
const ViewReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  var postsPerPage = 5;
  // Handling amount of posts on each page
  const lastPostidx = currentPage * postsPerPage;
  const firstPostidx = lastPostidx - postsPerPage;

  // fetching the reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/postReviews/${id}`,
        });
        setReviews(res.data.data);
        setFetching(false);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchReviews();
  }, []); // [] needs to be here so that it is only loaded when mounted, otherwise infinite loop

  const currentReviews = reviews.slice(firstPostidx, lastPostidx); // to wrap into array

  // when the user presses on one of the pagination pages, we move to that page
  const separate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <ReviewsList reviews={currentReviews} fetching={fetching} />
      <Separator totalNmbr={reviews.length} nmbrPerPage={postsPerPage} separateFunc={separate} />
    </div>
  );
};

export default ViewReviews;
