import React from "react";
import { useEffect } from "react";
import { useState } from "react";


const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get("/posts");
            setPosts(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
    }
    );
};