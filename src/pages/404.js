import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="relative">
      <Image
        height={400}
        width={400}
        src={"/404.webp"}
        className="w-full h-[500px] sm:h-auto object-cover"
        alt="404"
      />
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg absolute top-7 left-1/2 transform -translate-x-1/2 w-auto">
          Go to Home Page
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
