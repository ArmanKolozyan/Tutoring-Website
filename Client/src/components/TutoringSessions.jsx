import PostCard from "./PostCard";

const TutoringSessions = ({ posts, fetching }) => {
    
  
    if (fetching) {
      return <h2>The posts are loading...</h2>;
    }
  
    return (
      <ul className='list-group mb-4'>
        {posts.map(post => (
          <li key={post.id} className='list-group-item'>
            <PostCard post = {post}/>
          </li>
        ))}
      </ul>
    );
  };

  export default TutoringSessions;
