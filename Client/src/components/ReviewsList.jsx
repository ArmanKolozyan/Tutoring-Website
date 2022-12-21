import ViewReview from "./ViewReview";

const ReviewsList = ({ reviews, fetching }) => {
    
  
    if (fetching) {
      return <h2>The reviews are loading...</h2>;
    }
  
    return (
      <ul className='list-group mb-4'>
        {reviews.map(review => (
          <li key={review.id}>
            <ViewReview review = {review}/>
          </li>
        ))}
      </ul>
    );
  };

  export default ReviewsList;
