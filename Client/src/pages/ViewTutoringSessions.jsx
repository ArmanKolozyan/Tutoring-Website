import TutoringSessions from "../components/TutoringSessions";
import Separator from "../components/Separator";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewTutoringSessions = () => {
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  var postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/posts/`,
        });
        setPosts(res.data);
        setFetching(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []); // [] needs to be here so that it is only loaded when mounted, otherwise infinite loop

  // Handling amount of posts on each page
  const lastPostidx = currentPage * postsPerPage;
  const firstPostidx = lastPostidx - postsPerPage;
  const currentPosts = posts.slice(firstPostidx, lastPostidx);

  const separate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <TutoringSessions posts={currentPosts} fetching={fetching} />
      <Separator
        totalNmbr={posts.length}
        nmbrPerPage={postsPerPage}
        separateFunc={separate}
      />
    </div>
  );
};

export default ViewTutoringSessions;
