import PostCards from "../../components/pagination/PostCards";
import Separator from "../../components/pagination/Separator";
import { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "../../components/searching/TutoringPostSearchbar";

/**
 * COMPONENT FOR PAGINATING THE TUTORING POSTS
 */
const ViewTutoringPosts = () => {
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searching, setSearching] = useState(false);
  var postsPerPage = 3;

  // get the total amount of posts (a number, to calculate number of pages)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: `http://localhost:8800/tutoringposts/amount`,
        });
        console.log("ress")
        console.log(res.data.data)
        setTotalPosts(res.data.data);
        setFetching(false);
      } catch (err) {
        console.log("ress")
        console.log(err.response.data.message);
      }
    };
    if (searching === false) {
      fetchPosts();
    }
  }, [searching]); // [] needs to be here so that it is only loaded when mounted, otherwise infinite loop

  // Handling posts on pages
  const [currentPosts, setCurrentPosts] = useState([]);
  const [lastPostidx, setLastPostidx] = useState(currentPage * postsPerPage);
  const [firstPostidx, setFirstPostidx] = useState(lastPostidx - postsPerPage);

  // get the tutoring posts of the current page
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios({
          method: "get",
          withCredentials: true,
          url: "http://localhost:8800/tutoringposts/",
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
    if (searching === false) {
      fetchPosts();
    }
  }, [lastPostidx, searching]); // [] needs to be here so that it is only loaded when mounted, otherwise infinite loop

  // we provide this as a callback to the pagination handler and the searching handler
  const separate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setLastPostidx(pageNumber * postsPerPage);
    setFirstPostidx(pageNumber * postsPerPage - postsPerPage);
  };

  return (
    <div className="container mt-5">
      <Searchbar
        separate={separate}
        callback={setCurrentPosts}
        start={firstPostidx}
        end={lastPostidx}
        setSearching={setSearching}
        setTotalPosts={setTotalPosts}
      />
      <PostCards posts={currentPosts} fetching={fetching} is_tutorcard={true} />
      <Separator totalNmbr={totalPosts} nmbrPerPage={postsPerPage} separateFunc={separate} />
    </div>
  );
};

export default ViewTutoringPosts;
