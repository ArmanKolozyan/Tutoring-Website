import GroupCard from "./GroupCard";
import TutoringCard from "./TutoringCard";
import axios from "axios";

const PostCards = ({ posts, fetching, is_tutorcard }) => {
  if (fetching) {
    return <h2>The posts are loading...</h2>;
  }



  return (
    <ul className="list-group mb-4">
      {is_tutorcard
        ? posts.map((post) =>
            (
              <li key={post.id} className="list-group-item">
                <TutoringCard post={post} />
              </li>
            )
          )
        : posts.map((post) => (
            <li key={post.id} className="list-group-item">
              <GroupCard post={post} />
            </li>
          ))}
    </ul>
  );
};

export default PostCards;
