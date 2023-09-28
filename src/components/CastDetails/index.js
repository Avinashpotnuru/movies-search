//next imports

import { useRouter } from "next/router";
import Image from "next/image";

import { imagePath } from "@/utilities";

//hooks
import { useState } from "react";

//import third party packages
import { Puff } from "react-loader-spinner";

//import components
import SimilarMovieCard from "../SimilarMovieCard";

//import from store
import { useGetCastFullDetailsQuery } from "@/store/api/restApis";
import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const CastDetails = () => {
  const [showDetails, setShowDetails] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetCastFullDetailsQuery({ id });

  console.log(data);

  const images = data?.images?.profiles;

  const faceBook = data?.external_ids?.facebook_id;
  const twitter = data?.external_ids?.twitter_id;
  const instagram = data?.external_ids?.instagram_id;
  const heroMovies = data?.combined_credits?.cast;

  console.log(heroMovies);

  return (
    <div className=" flex-col justify-center items-center mx-auto min-h-screen w-full relative  ">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Puff
            height="80"
            width="80"
            radius={1}
            color="white"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="w-full mx-auto   flex flex-col justify-center items-center md:flex-row md:justify-center md:items-center py-7 lg:py-10 relative">
            <Link href="/">
              {" "}
              <div className="absolute top-7 left-7 h-[30px] w-[30px] md:h-[50px] md:w-[50px] bg-white hover:bg-slate-300 flex justify-center items-center">
                <GrHomeRounded />
              </div>
            </Link>
            <div className="md:flex justify-center items-center pt-10  ">
              <div className="md:w-[40%] ">
                <Image
                  height={500}
                  width={500}
                  className=" h-[440px] w-[320px] lg:h-auto  mb-3 rounded-lg overflow-hidden shadow-lg  object-center mx-auto"
                  src={`${
                    data?.profile_path
                      ? `${imagePath}${data?.profile_path}`
                      : "/noimage.png"
                  }`}
                  alt={`image${id}`}
                />
              </div>
              <div className="text-white space-y-3 px-5 font-bold lg:px-10 md:w-[60%] ">
                <div className="flex items-center space-x-5 my-4">
                  {instagram && (
                    <a
                      href={`https://www.instagram.com/${instagram}/`}
                      target="_blank"
                    >
                      <BsInstagram size={34} />
                    </a>
                  )}

                  {faceBook && (
                    <a
                      href={`https://www.facebook.com/${faceBook}`}
                      target="_blank"
                    >
                      <BsFacebook size={34} />
                    </a>
                  )}

                  {twitter && (
                    <a href={`https://twitter.com/${twitter}`} target="_blank">
                      <BsTwitter size={34} />
                    </a>
                  )}
                </div>
                <h1>
                  Name:{" "}
                  <span className="text-xl lg:text-3xl font-normal">
                    {data?.name}
                  </span>
                </h1>
                {data?.biography && (
                  <h1>
                    About:
                    <span className="text-base font-normal">
                      {data?.biography}
                    </span>
                  </h1>
                )}
                {data?.birthday && (
                  <h1>
                    D.O.B:{" "}
                    <span className="text-base font-normal">
                      {data?.birthday}
                    </span>
                  </h1>
                )}
                {data?.place_of_birth && (
                  <h1>
                    Place of birth:{" "}
                    <span className="text-base font-normal">
                      {data?.place_of_birth}
                    </span>
                  </h1>
                )}

                {data?.also_known_as && (
                  <div className="">
                    <span>Also known as :</span>
                    <div className="flex flex-wrap ">
                      {data?.also_known_as?.map((e, idx) => e).join(",")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:px-6 md:px-10 lg:px-20 xl:px-24">
            {heroMovies && (
              <>
                <h1 className="text-white text-2xl font-semibold my-3 mx-4">
                  Movies of {data?.name}
                </h1>
                <div className="flex flex-col  overflow-x-auto w-full p-3">
                  <div className="flex  space-x-4  ">
                    {heroMovies?.map((e, idx) => (
                      <SimilarMovieCard key={idx} {...e} />
                    ))}
                  </div>
                </div>
              </>
            )}
            {images && (
              <>
                <h1 className="text-white text-2xl font-semibold my-3 mx-4">
                  More images
                </h1>
                <div className="flex flex-col  overflow-x-auto w-full p-3">
                  <div className="flex  space-x-4  ">
                    {images?.map((e, idx) => (
                      <Image
                        key={idx}
                        height={700}
                        width={700}
                        className=" h-[250px] w-[180px] "
                        src={`${
                          e?.file_path
                            ? `${imagePath}${e?.file_path}`
                            : "/noimage.png"
                        }`}
                        alt={`image${idx}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CastDetails;
