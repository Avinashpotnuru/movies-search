//next imports

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { MdOutlineFavorite } from "react-icons/md";

import { useAddFavoritesMutation } from "@/store/api/restApis";

import CircleRating from "../CircleRating";

import { imagePath } from "@/utilities";

const SearchMovieCard = ({
  poster_path,
  id,
  title,
  release_date,
  overview,
  vote_average,
}) => {
  const [toggle, setToggle] = useState(false);
  const [addFavorite] = useAddFavoritesMutation();

  return (
    <div className=" rounded-md bg-gray-800 shadow-lg my-10">
      <div className="flex flex-col md:flex  md:flex-row px-4 leading-none max-w-4xl">
        <div className="flex-none  ">
          <Link href={`/movies/${id}`}>
            <Image
              height={700}
              width={700}
              className="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 "
              // src={`${imagePath}${poster_path}`}
              src={`${
                poster_path ? `${imagePath}${poster_path}` : "/noimage.png"
              }`}
              alt={`image${id}`}
            />
          </Link>
        </div>

        <div className="flex-col text-gray-300 w-full px-4  ">
          <div className="flex justify-between items-center w-full">
            <p className="pt-4 text-2xl font-bold">
              {title} {release_date && `(${release_date.slice(0, 4)})`}
            </p>
            <div
              onClick={() => {
                setToggle((prev) => !prev);
                addFavorite({
                  media_type: "movie",
                  media_id: id,
                  favorite: true,
                });
              }}
              className="mr-8"
            >
              <MdOutlineFavorite color={`${toggle ? "red" : ""}`} />
            </div>
          </div>

          <hr className="hr-text w-full" data-content="" />

          <p className="  my-4 text-sm text-left">{overview}</p>
          <div className="w-full  flex justify-center sm:justify-end items-center">
            <div className="h-[60px] w-[60px] ml-8  ">
              <CircleRating rating={vote_average.toFixed(1)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMovieCard;
