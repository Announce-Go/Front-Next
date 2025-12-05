"use client";
import { useState, useEffect } from "react";

function BlogPage() {
  const [posts, setPosts] = useState([]);

  const getFetch = () => {
    console.log(`hi`);
  };

  useEffect(() => {
    getFetch();
  }, []);

  return (
    <div>
      <h1>BlogPage</h1>
      <div></div>
    </div>
  );
}

export default BlogPage;
