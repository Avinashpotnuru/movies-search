import dynamic from "next/dynamic";
import React from "react";

const VideoCard = dynamic(() => import("../VideoCard"), {
  ssr: false,
});

const MovieVideos = ({ videos }) => {
  return (
    <>
      {videos?.length && (
        <>
          <h1 className=" font-bold text-white my-3 text-2xl  text-center">
            Videos
          </h1>
          <div className="flex flex-col  overflow-x-auto w-full p-3">
            <div className="flex  space-x-4  ">
              {videos?.slice(0, 10).map((e, idx) => (
                <VideoCard key={idx} videos={e} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MovieVideos;
