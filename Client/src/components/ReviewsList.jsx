import ViewReview from "./ViewReview";

 /**
 * COMPONENT FOR LISTING ALL REVIEWS
 */
const ReviewsList = ({ reviews, fetching }) => {
  if (fetching) {
    // keep user updated that the reviews are being fetched
    return <h2>The reviews are loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {reviews.map((review) => (
        <li key={review.id}>
          <ViewReview review={review} />
        </li>
      ))}
    </ul>
  );
};

export default ReviewsList;
