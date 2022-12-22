import GroupCard from "./GroupCard";
import TutoringCard from "./TutoringCard";




/**
 * SHOWING A LIST OF POST CARDS GIVEN THE POSTS, WHETHER WE ARE FETCHING
 * AND IF IT IS A TUTORCARD (OR A GROUP SESSION CARD)
 */
const PostCards = ({ posts, fetching, is_tutorcard }) => {


  if (fetching) { // let the user know that we're fetching
    return <h2>The posts are loading...</h2>;
  }



  return (
    <ul className="list-group mb-4">
      {is_tutorcard 
        ? posts.map((post) => // tutoring  card
            (
              <li key={post.id} className="list-group-item"> 
                <TutoringCard post={post} /> 
              </li>
            ) 
          )
        : posts.map((post) => ( // group session card
            <li key={post.id} className="list-group-item">
              <GroupCard post={post} />
            </li>
          ))}
    </ul>
  );
};

export default PostCards;
