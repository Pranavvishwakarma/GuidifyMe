import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import Modal from "./Modal";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { categoryData } from "../data";

const Posts = () => {
  const [seen, setSeen] = useState(false);
  // const [userData, setUserData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [category, setCategory] = useState([]);
  const [user] = useAuthState(auth);

  // console.log(posts);

  function togglePop() {
    setSeen((prev) => !prev);
  }

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const createPost = async () => {
      // const val = userData.find((val) => {
      //   return val.uid === user.uid;
      // });
      // console.log(val);
      try {
        // console.log(`the category`, category);
        const postData = {
          // author: val.userData.name,
          text: newPost,
          timestamp: new Date().toISOString(),
          comments: [],
          uid: user.uid,
          metadata: {
            upvotes: 0,
            downvotes: 0,
          },
          category: category,
        };
        const postRef = collection(db, "posts");
        const createdPost = await addDoc(postRef, postData);
        console.log(`Post created successfully with ID:`, createdPost.id);
        setPosts([postData, ...posts]);
        setNewPost("");
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Error creating post: ", error.message);
      }
    };

    createPost();
    setSeen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const postData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postData);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const userRef = collection(db, "users");
  //     const docSnap = await getDocs(userRef);

  //     var result = [];

  //     docSnap.forEach((doc) => {
  //       console.log(doc.data());
  //       // This method doesnt work
  //       // result = [...userData, doc.data()];
  //       result.push(doc.data());
  //       // console.log(`userData `, result);
  //     });
  //     setUserData(result);
  //   };

  //   fetchUserData();
  // }, []);
  return (
    <div className="overflow-auto w-full md:w-[50%] flex flex-col gap-2">
      <form
        className="p-4 flex flex-row gap-4 items-center border-blue-200 border rounded-md mx-2 mb-2 shadow-md"
        onSubmit={handleCreatePost}
      >
        <div>
          <CgProfile size={36} />
        </div>
        <input
          onClick={togglePop}
          className="border rounded-md p-2 w-full outline-none"
          type="text"
          placeholder="Enter your question"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          readOnly
        />
        <button
          onClick={togglePop}
          className="bg-primary text-white border h-full min-w-20 rounded-md"
        >
          Ask
        </button>

        {seen ? (
          <Modal
            newPost={newPost}
            setNewPost={setNewPost}
            toggle={togglePop}
            categoryData={categoryData}
            setCategory={setCategory}
          />
        ) : null}
      </form>

      {posts?.map((post) => {
        {
          /* const val = userData.find((val) => {
          return val.uid === post.uid;
        });

        console.log(`match `, val ? "found" : "not found"); */
        }

        return (
          <div
            key={post.id}
            className="border-blue-100 border p-4 m-2 flex flex-col gap-2 rounded-md drop-shadow-md bg-white hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex flex-row gap-4 rounded-md items-center">
              <CgProfile size={36} />
              <div className="items-center">
                <div className="flex gap-2 items-center">
                  {post.author ?? "Anonymous"}
                  <div className="h-1.5 w-1.5 bg-[#bbb] inline-block rounded-full"></div>
                  {new Date(post?.timestamp)?.toDateString()}
                </div>
                <div className="text-xs">
                  {/* {console.log(post.category)} */}
                  {post?.category
                    ? post.category.map((val, key) => {
                        return <span key={key}>{val} &nbsp; </span>;
                      })
                    : "uncategorized"}
                </div>
              </div>
            </div>

            <Link to={`/post/${post.id}`} className="">
              {post.text}
            </Link>

            <hr className="my-1" />

            <div className="flex flex-row gap-4 justify-between">
              <div className="flex flex-row gap-4">
                <button
                  type="button"
                  className="flex flex-row gap-1 items-center justify-center w-16 border-blue-200 bg-blue-50 border rounded-md p-1 shadow-md shadow-blue-50 hover:shadow-blue-100"
                  onClick={async () => {
                    const docRef = doc(db, "posts", post.id);
                    const docSnap = await getDoc(docRef);
                    const postData = docSnap.data();

                    const updatedVotes = postData.metadata.upvotes + 1;

                    console.log(
                      ` intial upvotes ${postData.metadata.upvotes} updated downvote ${updatedVotes}`
                    );

                    await updateDoc(docRef, {
                      "metadata.upvotes": updatedVotes,
                    });
                  }}
                >
                  <BiSolidUpvote color="#4a7999" size={18} />
                  <span>
                    {post.metadata.upvotes ? post.metadata.upvotes : 0}
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-row gap-1 items-center justify-center w-16 border-blue-200 bg-blue-50 border rounded-md p-1 shadow-md shadow-blue-50 hover:shadow-blue-100"
                  onClick={async () => {
                    const docRef = doc(db, "posts", post.id);
                    const docSnap = await getDoc(docRef);
                    const postData = docSnap.data();

                    const updatedVotes = postData.metadata.downvotes + 1;

                    console.log(
                      ` intial downvotes ${postData.metadata.downvotes} updated downvote ${updatedVotes}`
                    );

                    await updateDoc(docRef, {
                      "metadata.downvotes": updatedVotes,
                    });
                  }}
                >
                  <BiSolidDownvote color="#4a7999" size={18} />

                  <span>
                    {post.metadata.downvotes ? post.metadata.downvotes : 0}
                  </span>
                </button>
              </div>

              <Link
                to={`/post/${post.id}`}
                className=" bg-primary bg-opacity-95 hover:bg-opacity-100 text-white py-1 text-center flex gap-1 justify-center items-center w-20 rounded-md font-semibold drop-shadow-md"
              >
                <FaReply color="white" size={14} />
                <span className="ml-1">Reply</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
