import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Post = () => {
  const [showReply, setShowReply] = useState(false);
  const [newComment, setNewComment] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const [postDetail, setPostDetail] = useState({
    comments: [],
    upvotes: 0,
    downvotes: 0,
    text: "",
  });

  const addComment = async (e) => {
    e.preventDefault();
    setShowReply(false);
    const docRef = doc(db, "posts", id);
    // setPostDetail({ ...postDetail, downvotes: updatedVotes });
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());

    var updatedComment = docSnap.data().comments;
    updatedComment = updatedComment
      ? [...updatedComment, newComment]
      : [newComment];
    // console.log(updatedComment);

    await updateDoc(docRef, {
      comments: updatedComment,
    });

    setNewComment("");
  };

  const fetchPost = async () => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const postData = docSnap.data();
      console.log(postData);
      const result = {
        ...postDetail,
        comments: postData.comments,
        upvotes: postData.metadata.upvotes,
        downvotes: postData.metadata.downvotes,
        text: postData.text,
        timestamp: postData.timestamp,
      };
      setPostDetail(result);

      // console.log(postData, postDetail);
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <div className="flex flex-col items-center gap-4 m-4">
        <div className="border-blue-100 border p-4 m-2 flex flex-col gap-2 rounded-md drop-shadow-md bg-white w-3/5">
          <div className="flex flex-row gap-4 rounded-md items-center">
            <CgProfile size={36} />
            <div className="items-center">
              <div className="flex gap-2 items-center">
                {postDetail.author ?? "Anonymous"}
                <div className="h-1.5 w-1.5 bg-[#bbb] inline-block rounded-full"></div>
                {/* {postDetail.timestamp} */}
                {new Date(postDetail?.timestamp)?.toDateString()}
              </div>
              <div className="text-xs">
                {postDetail.category ?? "Uncategorised"}
              </div>
            </div>
          </div>

          <p>{postDetail.text}</p>

          <hr className="my-1" />

          <div className="flex flex-row gap-4 items-center">
            <button
              type="button"
              className="flex flex-row gap-1 items-center justify-center w-16 border-blue-200 bg-blue-50 border rounded-md p-1 shadow-md shadow-blue-50 hover:shadow-blue-100"
              onClick={async () => {
                const docRef = doc(db, "posts", id);
                const updatedVotes = postDetail.upvotes + 1;
                setPostDetail({ ...postDetail, upvotes: updatedVotes });

                await updateDoc(docRef, {
                  "metadata.upvotes": updatedVotes,
                });
              }}
            >
              <BiSolidUpvote color="#4a7999" size={18} />
              <div>{postDetail.upvotes ? postDetail.upvotes : 0}</div>
            </button>
            <button
              type="button"
              className="flex flex-row gap-1 items-center justify-center w-16 border-blue-200 bg-blue-50 border rounded-md p-1 shadow-md shadow-blue-50 hover:shadow-blue-100"
              onClick={async () => {
                const docRef = doc(db, "posts", id);
                const updatedVotes = postDetail.downvotes + 1;
                // console.log(`updated downvote ${updatedVotes}`);
                setPostDetail({ ...postDetail, downvotes: updatedVotes });

                await updateDoc(docRef, {
                  "metadata.downvotes": updatedVotes,
                });
              }}
            >
              <BiSolidDownvote color="#4a7999" size={18} />
              <div>{postDetail.downvotes ? postDetail.downvotes : 0}</div>
            </button>
          </div>
        </div>

        <form
          onSubmit={addComment}
          className="border-blue-200 border rounded-md p-4 gap-2 flex flex-col w-3/5 shadow-md"
        >
          <textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            className="border-blue-200 focus:border-blue-400 outline-none border rounded-md p-2 w-full"
            placeholder="Add a comment"
            rows={2}
            maxLength={800}
          ></textarea>

          <button
            type="submit"
            disabled={newComment.length < 1 ? true : false}
            className="rounded-md px-4 py-1.5 w-fit bg-primary drop-shadow-lg disabled:bg-opacity-90 text-white ml-auto"
          >
            Add a Reply
          </button>
        </form>

        <div className="rounded-md py-6 gap-4 w-3/5">
          <div className="text-2xl font-semibold">Answered by others</div>
          <br />

          <div className="flex flex-col gap-6">
            {postDetail.comments
              ? postDetail.comments.map((post, key) => {
                  return (
                    <div
                      key={key}
                      className="border-blue-300 shadow-md border p-4 rounded-md flex flex-col gap-4"
                    >
                      <div className="border-black flex flex-row gap-4 items-center">
                        <CgProfile size={36} />
                        <div>Person {key + 1}</div>
                      </div>
                      <p className="text-ellipsis line-clamp-[10]">{post}</p>

                      {/* {showReply ? (
                        <div className="pl-20 flex flex-col gap-4">
                          <div className="border-black border rounded-md p-4 flex flex-row gap-4 items-center">
                            <CgProfile size={36} />
                            <div>User2</div>
                          </div>
                          <div className="border-black border rounded-md p-2 ">
                            Answer
                          </div>

                          <div className="flex flex-row gap-6">
                            <div className="flex flex-row gap-2">
                              <button>
                                <BiSolidUpvote size={24} />
                              </button>
                              <div>14</div>
                            </div>
                            <button className="bg-primary text-white rounded-md p-2 w-20">
                              Reply
                            </button>
                          </div>
                        </div>
                      ) : null} */}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default Post;
