import Link from "next/link";

// third party imports

import { BsGithub, BsLinkedin, BsInstagram, BsFacebook } from "react-icons/bs";

const iconVariants = {
  hover: {
    scale: 1.3,
    rotateZ: 360,
    borderRadius: "50%",
    borderColor: "#0c7fb0",
    borderWidth: "2.5px",
    padding: "2.2px",
    transition: {
      duration: 0.8,
    },
  },
};

const Footer = () => {
  return (
    <div className="bg-[#475569] w-full text-white py-5 ">
      <div className="sm:w-[80%] md:w-[70%] lg:w-[30%] sm:mx-auto">
        <div className="flex justify-around items-center py-5 ">
          <a href="https://github.com/Avinashpotnuru" target="_blank">
            <BsGithub size={34} />
          </a>
          <a
            href="https://www.linkedin.com/in/avinash-potnuru/"
            target="_blank"
          >
            <BsLinkedin size={34} />
          </a>
          <a href="https://www.instagram.com/potnuru_avinash/" target="_blank">
            <BsInstagram size={34} />
          </a>
          <a href="https://www.facebook.com/avinash.potnuru.18" target="_blank">
            <BsFacebook size={34} />
          </a>
        </div>
        <h1 className="text-center py-4 px-5">
          Copyright ©2023{" "}
          <span className="font-roboto-slab text-base hover:text-[#4e4ee1]">
            Avinash Potnuru
          </span>
          , Inc. All rights reserved
        </h1>
      </div>
    </div>
  );
};

export default Footer;
