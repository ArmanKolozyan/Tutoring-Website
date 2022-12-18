import PostCards from "../components/PostCards";
import Separator from "../components/Separator";
import { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "../components/GroupSessionSearchbar";

const ViewTutoringSessions = () => {
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  var postsPerPage = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/grouppostsAmount/`,
        });
        setTotalPosts(res.data.data);
        setFetching(false);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchPosts();
  }, []); // [] needs to be here so that it is only loaded when mounted, otherwise infinite loop

  // Handling posts on pages
  const [currentPosts, setCurrentPosts] = useState([]);
  const [lastPostidx, setLastPostidx] = useState(currentPage * postsPerPage);
  const [firstPostidx, setFirstPostidx] = useState(lastPostidx - postsPerPage);

  useEffect(() => {
    const fetchPosts = async () => {

      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: "http://localhost:8800/groupposts/",
          params: {
            start: firstPostidx,
            end: lastPostidx,
          },
        });
        setCurrentPosts(res.data.data);
        setFetching(false);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchPosts();
  }, [lastPostidx]); // [] needs to be here so that it is only loaded when mounted, otherwise infinite loop

  const separate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setLastPostidx(pageNumber * postsPerPage);
    setFirstPostidx(pageNumber * postsPerPage - postsPerPage);
  };

  return (
    <div className="container mt-5">
      <Searchbar callback = {setCurrentPosts} start = {firstPostidx} end = {lastPostidx} />
      <PostCards posts={currentPosts} fetching={fetching} is_tutorcard = {false}/>
      <Separator
        totalNmbr={totalPosts}
        nmbrPerPage={postsPerPage}
        separateFunc={separate}
      />
    </div>
  );
};

export default ViewTutoringSessions;