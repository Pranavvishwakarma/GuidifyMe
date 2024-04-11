import { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

const RecommendedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, limit(5));
      const snapshot = await getDocs(q);
      const postData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postData);
    };

    fetchData();
    console.log(posts);
  }, []);

  return (
    <div className="hidden md:block md:w-[20%]">
      <h3 className="pb-2 text-xl font-semibold pl-2 text-blue-600">
        Recommended Posts
      </h3>
      <hr className="border-blue-600 mx-2 pb-2" />
      <ul className="flex flex-row sm:flex-col flex-wrap gap-1">
        {posts.map((post) => (
          <Link
            className="flex flex-row hover:bg-gray-100 active:bg-gray-200 p-2 rounded-md w-full"
            to={`/post/${post.id}`}
            key={post.id}
          >
            <span className="text-ellipsis line-clamp-3 text-sm">
              {post.text}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedPosts;
