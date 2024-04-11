import { Link } from "react-router-dom";
import { categoryData } from "../data";

const CategoryList = () => {
  return (
    <ul className="w-full md:w-[20%] flex flex-row gap-2 border-black sm:flex-col flex-wrap [&>a]:w-60 [&>a]:p-2 [&>a]:pr-4 [&>a]:rounded-md hover:[&>a]:bg-gray-100">
      {categoryData.map((category) => (
        <Link
          className="flex flex-row items-center text-base font-semibold gap-3"
          to={`/category/${category.slug}`}
          key={category.slug}
        >
          <img src={category.image} className="size-9" />
          <div>{category.name}</div>
        </Link>
      ))}
    </ul>
  );
};

export default CategoryList;
