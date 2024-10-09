import React, { useState } from 'react'
import Image from "next/image";
import { MdOutlineFavorite } from 'react-icons/md';
import Link from 'next/link';
import CircleRating from '../CircleRating';
import { AiOutlineRight } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { imagePath } from "@/utilities";
import { useAddFavoritesMutation } from '@/store/api/restApis';


const MoviesInfo = ({ data, id, trailer, key }) => {
  const [toggle, setToggle] = useState(false);
  const [addFavorite] = useAddFavoritesMutation();

  const renderGenres = () => {
    return data?.genres?.map((item, idx) => (
      <button
        className="text-black font-semibold mb-2 px-2 bg-gradient-to-r from-teal-200 to-teal-500"
        key={idx}
      >
        {item.name}
      </button>
    ));
  };

  const renderLanguages = () => {
    return data?.spoken_languages?.map((e) => e.english_name).join(",");
  };

  const toggleFavorite = () => {
    setToggle((prev) => !prev);
    addFavorite({
      media_type: "movie",
      media_id: id,
      favorite: true,
    });
  };

  return (
    <div className={`w-full md:h-[60vh] lg:h-[80vh] ${data.backdrop_path && ""} rounded-md flex justify-center items-center relative`}>
      <div className="opacity-layer1 h-[20px] md:h-[1px] lg:h-[100px]"></div>
      <Image
        src={data.backdrop_path ? `${imagePath}${data.backdrop_path}` : "/backgroundImage.jpg"}
        height={100}
        width={100}
        className="w-full h-full hidden md:block object-cover absolute -z-10 opacity-30"
        alt="image"
      />
      <div className="flex flex-col md:flex-row md:justify-around sm:items-center space-y-4 md:space-y-0 w-full px-4 md:px-5 lg:px-24 xl:px-40">
        <div className="flex justify-center items-center">
          <Image
            height={300}
            width={400}
            src={data.poster_path ? `${imagePath}${data.poster_path}` : "/noimage.png"}
            className="w-[300px] h-[380px] md:min-h-full sm:hidden"
            alt="image"
          />
          <div className="hidden w-full sm:flex md:flex justify-center items-center">
            <Image
              height={300}
              width={400}
              src={data.poster_path ? `${imagePath}${data.poster_path}` : "/noimage.png"}
              className="w-[300px] h-[450px] md:min-w-[380px] lg:min-h-[500px] lg:min-w-[410px] mb-6"
              alt="image"
            />
          </div>
        </div>
        <div className="text-blue-900 md:flex md:flex-col md:justify-around px-4 p-3 md:px-8 lg:px-14 xl:px-24">
          <div className="flex justify-between items-center my-2 sm:my-4">
            <div>
              <h1 className="text-white text-2xl font-extrabold">{data?.title}</h1>
              <h1 className="text-white text-lg font-semibold">{data?.tagline}</h1>
            </div>
            <div onClick={toggleFavorite} className="mr-8">
              <MdOutlineFavorite color={toggle ? "red" : "white"} />
            </div>
          </div>
          <div>
            <h1 className="text-white text-base">{data?.overview}</h1>
          </div>
          <div className="flex flex-wrap space-x-2 my-5">{renderGenres()}</div>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-white text-base">
                <span className="font-bold text-base">Run time : </span>
                {`${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}m`}
              </h1>
              <h1 className="text-white text-base">
                <span className="font-bold text-base">Languages : </span>
                {renderLanguages()}
              </h1>
              <h1 className="text-green-500 font-bold">
                <span className="text-white font-bold text-base">Release Date :</span> {data?.release_date}
              </h1>
              <h1 className="text-green-500 font-bold">
                <span className="text-white font-bold text-base">Status :</span> {data?.status}
              </h1>
            </div>
            <div className="h-[60px] w-[60px]">
              <CircleRating rating={data?.vote_average?.toFixed(1)} />
            </div>
          </div>
          <div className="flex flex-col justify-center sm:flex-row sm:justify-between space-y-4 sm:space-y-0 items-center my-4">
            <Link href={`/images/${id}`}>
              <button className="bg-transparent flex justify-center items-center text-white py-2 px-4 rounded-md space-x-2 transition duration-300 ease-in-out border-2 hover:border-green-400 hover:text-green-500">
                More Images
                <div className="ml-2 my-auto">
                  <AiOutlineRight />
                </div>
              </button>
            </Link>
            {trailer.length > 0 && (
              <a href={`https://www.youtube.com/watch?v=${key}`} target="_blank">
                <button className="bg-transparent flex justify-center items-center text-white py-2 px-4 rounded-md space-x-2 transition duration-300 ease-in-out border-2 hover:border-green-400 hover:text-green-500">
                  <div className="ml-2 my-auto">
                    <BsFillPlayFill />
                  </div>
                  Watch Trailer
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesInfo
