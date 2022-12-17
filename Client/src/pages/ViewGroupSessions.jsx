import PostCards from "../components/PostCards";
import Separator from "../components/Separator";
import { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "../components/SearchBar";

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
          url: `http://localhost:8800/groupposts/`,
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
      <Searchbar callback = {setPosts} />
      <PostCards posts={currentPosts} fetching={fetching} is_tutorcard = {false}/>
      <Separator
        totalNmbr={posts.length}
        nmbrPerPage={postsPerPage}
        separateFunc={separate}
      />
    </div>
  );
};

export default ViewTutoringSessions;
