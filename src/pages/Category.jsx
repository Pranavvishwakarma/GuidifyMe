import React from "react";
// import { Footer, NavBar } from "../components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Categories from "../components/CategoryList";
import Posts from "../components/Posts";
import RecommendedPosts from "../components/RecommendedPosts";
import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();

  return (
    <React.Fragment>
      <NavBar />
      Category : {id}
      <div className="flex flex-col justify-between	sm:flex-row w-12/12 border-dashed border-2 border-black">
        <Categories />
        <Posts />
        <RecommendedPosts />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Category;
