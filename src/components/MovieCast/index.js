import React from 'react'
import CastCard from '../CastCard';

const MovieCast = ({ cast }) => {
  return (
    <>
      {cast?.length > 0 && (
        <>
          <h1 className="font-bold text-white my-3 text-2xl  text-center">
            Cast
          </h1>
          <div className="flex flex-col  overflow-x-auto w-full  p-3">
            <div className="flex  space-x-4 pt-4 ">
              {cast?.map((e, idx) => (
                <CastCard key={idx} {...e} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MovieCast
