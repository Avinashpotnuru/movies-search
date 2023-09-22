//next imports
import Image from "next/image";
import Link from "next/link";

import { searchInputHandler, closeNav } from "@/store/slice/tabsSlice";

import { useDispatch } from "react-redux";

import { imagePath } from "@/utilities";
const SearchTabComponent = ({
  title,
  poster_path,
  id,
  tabHandler,
  clearInput,
}) => {
  const dispatch = useDispatch();

  // console.log(clearInput);

  return (
    <Link href={`/movies/${id}`}>
      <div
        onClick={() => {
          tabHandler(false);
          dispatch(searchInputHandler(""));
          dispatch(closeNav());
        }}
        className="w-full  flex justify-between items-center bg-gray-700 py-2 px-3 min-h-10 border-t-[1px]"
      >
        <div className="w-[30%]">
          <Image
            height={500}
            width={500}
            className="h-[40px] w-[30px] overflow-hidden shadow-lg "
            src={`${
              poster_path ? `${imagePath}${poster_path}` : "/noimage.png"
            }`}
            alt="Bonnie image"
          />
        </div>

        <h1 className="text-center text-[10px] font-bold text-white w-[70%]">
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default SearchTabComponent;
