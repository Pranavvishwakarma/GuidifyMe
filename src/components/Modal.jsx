import { useState } from "react";
import "./Modal.css";

function Modal(props) {
  const categories = {
    health: false,
    skills: false,
    entrepreneurship: false,
    career: false,
    decisionMaking: false,
    financialLiteracy: false,
    learning: false,
    relationships: false,
    spirituality: false,
  };

  const [catActive, setCategoryActive] = useState(categories);
  const [style, setStyle] = useState("border border-black p-2");
  const [selectedCategory, setSelectedCategory] = useState([]);

  const updateCat = (val) => {
    setStyle("border border-black p-2 bg-slate-800 text-white");

    // console.log(val);
    const updatedActiveCategory = {
      ...catActive,
      [val.slug]: !catActive[val.slug],
    };
    // console.log(`updated one`, updatedActiveCategory);
    setCategoryActive(updatedActiveCategory);

    const result = Object.keys(updatedActiveCategory).filter(
      (val) => updatedActiveCategory[val]
    );

    setSelectedCategory(result);
    // // console.log(selectedCategory);
    props.setCategory(result);
    console.log(`categories `, catActive, `active categories`, result);
  };

  return (
    <div className="popup">
      <div className="popup-inner p-4 flex flex-col rounded-md shadow-2xl drop-shadow-2xl">
        <div className="flex">
          <div className="bg-blue-700 w-1.5"></div>
          <div className="bg-gradient-to-r from-blue-200 to-blue-100 flex-1 pl-2 py-1">
            <h6 className="font-bold">Tips on getting good answers quickly</h6>
            <p>
              <ul>
                <li>Make sure your answer has not been asked already</li>
                <li>Keep your question short and to the point</li>
                <li>Double-check grammar and spelling</li>
              </ul>
            </p>
          </div>
        </div>

        <div className="m-2 flex flex-row justify-center gap-4 flex-wrap">
          {props.categoryData.map((val, key) => {
            return (
              <div
                key={key}
                onClick={() => updateCat(val)}
                className={
                  catActive[val.slug] ? style : "border border-black p-2"
                }
              >
                {val.slug}
              </div>
            );
          })}
        </div>

        <textarea
          className="border border-gray-300 w-full rounded-md bg-gray-50 p-2 mt-4 outline-none focus:ring-1 focus:ring-blue-500"
          value={props.newPost}
          placeholder="Say something"
          onChange={(e) => {
            props.setNewPost(e.target.value);
            if (props.newPost > 0) {
              setDisable(false);
            }
          }}
          required
          rows={8}
          maxLength={800}
          autoFocus
        ></textarea>

        <div className="flex flex-row gap-4 ml-auto mt-4">
          <button
            onClick={() => {
              props.setNewPost("");
              props.toggle();
            }}
            className="px-4 py-1.5 bg-red-500 text-white rounded-md shadow-red-300 shadow-md"
          >
            Cancel
          </button>
          {/* {props.newPost.length < 10 && selectedCategory.length > 0
            ? console.log(true)
            : console.log(false)} */}
          <button
            disabled={
              props.newPost.length > 10 && selectedCategory.length > 0
                ? false
                : true
            }
            className="px-4 py-1.5 bg-primary disabled:bg-opacity-80 text-white rounded-md shadow-blue-300 shadow-md"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
