//next imports
import { useParams } from "next/navigation";
import Image from "next/image";

import { imagePath } from "@/utilities";

//import from store

import { useGetMovieImagesQuery } from "@/store/api/restApis";
import { useRouter } from "next/router";

const ImagesComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetMovieImagesQuery({ id });

  return (
    <div className=" px-4 md:px-8 lg:px-16 xl:px-20 py-7">
      {data?.backdrops?.length && (
        <>
          <h1 className=" font-bold text-white my-3 text-2xl  text-center">
            Back Drop Images
          </h1>
          <div className="flex flex-col  overflow-x-auto w-full p-3">
            <div className="flex  space-x-4  ">
              {data?.backdrops?.map((e, idx) => (
                <Image
                  key={idx}
                  height={700}
                  width={700}
                  className=" h-auto w-[500px] "
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
      {data?.posters?.length && (
        <>
          <h1 className=" font-bold text-white my-3 text-2xl  text-center">
            Posters
          </h1>
          <div className="flex flex-col  overflow-x-auto w-full p-3">
            <div className="flex  space-x-4  ">
              {data?.posters?.map((e, idx) => (
                <Image
                  key={idx}
                  height={700}
                  width={700}
                  className=" h-[300px] w-[200px] "
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
  );
};

export default ImagesComponent;
