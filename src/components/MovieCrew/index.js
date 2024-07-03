import React from 'react'
import CastCard from '../CastCard';

const MovieCrew = ({ crew }) => {
  return (
    <div>
      {" "}
      {crew?.length > 0 && (
        <>
          <h1 className=" font-bold text-white my-3 text-2xl  text-center">
            Crew
          </h1>
          <div className="flex flex-col  overflow-x-auto w-full p-3">
            <div className="flex  space-x-4  ">
              {crew?.map((e, idx) => (
                <CastCard crew_name={"crew"} key={idx} {...e} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCrew