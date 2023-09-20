import Link from "next/link";
import { usePathname } from "next/navigation";

//react imports
import React, { useEffect, useRef, useState } from "react";
import {
  useGetSearchMoviesQuery,
  useGetGenresQuery,
} from "@/store/api/restApis";

import { useDispatch, useSelector } from "react-redux";

import { searchHandler, searchInputHandler } from "@/store/slice/tabsSlice";
import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

//import components
import SearchTabComponent from "../SearchTabComponent";
import Image from "next/image";

export const specials = [
  { name: "Hindi movies", page: "hindi", code: "hi" },
  { name: "Telugu movies", page: "telugu", code: "te" },
  { name: "Tamil movies", page: "tamil", code: "ta" },
  { name: "Kannada movies", page: "kannada", code: "kn" },
  { name: "Malayalam movies", page: "malayalam", code: "ml" },
];

const Navbar = () => {
  const dispatch = useDispatch();

  const menuRef = useRef(null);

  const dropDownCardRef = useRef(null);

  let [open, setOpen] = useState(false);

  const [dropDown, setDropDown] = useState(false);

  const [splDropDown, setSplDropDown] = useState(false);

  // const [searchInput, setInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [tabToggle, setToggle] = useState(false);
  const [dropDownCard, setDropDownCard] = useState(false);
  const [splDropDownCard, setSplDropDownCard] = useState(false);
  const path = usePathname();

  const searchInput = useSelector((state) => state.tabsSlice.searchInput);

  // console.log(searchInput);

  const submitHandler = () => {
    setSearchResult(searchInput);
    dispatch(searchHandler(searchInput));
    setOpen(false);
    setToggle(false);
    // setInput("");
    dispatch(searchInputHandler(""));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // console.log(event);
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
        // setInput("");
        dispatch(searchInputHandler(""));
      }

      if (
        dropDownCardRef.current &&
        !dropDownCardRef.current.contains(event.target)
      ) {
        setDropDownCard(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // console.log(dropDownCardRef.current);
  // console.log(menuRef.current);

  useEffect(() => {
    function handleDropClickOutside(event) {
      // console.log(event);

      if (
        dropDownCardRef.current &&
        !dropDownCardRef.current.contains(event.target)
      ) {
        setDropDownCard(false);
      }
    }

    document.addEventListener("click", handleDropClickOutside);

    return () => {
      document.removeEventListener("click", handleDropClickOutside);
    };
  }, []);

  const clearInput = () => {
    // setInput("");
  };

  const { data } = useGetSearchMoviesQuery({ searchInput });
  const searchData = data?.results;

  const { data: moviesList } = useGetGenresQuery();

  return (
    <div className=" bg-slate-600 w-full fixed z-30 ">
      <div className=" bg-slate-600 px-5 py-4 flex justify-between items-center fixed top-0 left-0 right-0 w-full z-30  ">
        {/* <h1 className=" text-2xl sm:text-3xl text-white font-bold italic">
          <Link href={"/"}>Movies Zone </Link>
        </h1> */}

        <Link href={"/"}>
          <Image
            height={100}
            width={100}
            className="h-[50px] w-[50px] rounded-full"
            src="/movieszone.png"
            alt="logo"
          />
        </Link>
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className="md:hidden transition-all duration-500 "
        >
          {!open ? (
            <AiOutlineMenu />
          ) : (
            <AiOutlineClose onClick={() => setDropDown(false)} />
          )}
        </div>

        <div className=" md:flex   w-[75%] justify-evenly items-center hidden">
          <div className="space-x-4 flex flex-col sm:flex-row items-center order-2 sm:order-1">
            <div className="relative">
              <h1
                onClick={() => {
                  setDropDownCard((prev) => !prev);
                  setSplDropDownCard(false);
                }}
                className={`ml-4 text-white font-bold mb-3 sm:mb-0  `}
              >
                Categories
              </h1>
              {dropDownCard && (
                <div
                  // ref={dropDownCardRef}
                  // onClick={() => setDropDownCard()}
                  className="bg-white w-[500px] rounded-lg absolute top-12 p-4 hidden  md:grid grid-cols-3 gap-5 "
                >
                  {moviesList?.genres?.map((item, idx) => (
                    <Link
                      // ref={dropDownCardRef}
                      className="hover:bg-slate-100"
                      onClick={() => {
                        setOpen(false);
                        setDropDownCard(false);
                      }}
                      href={`/category/${item?.id}`}
                      key={idx}
                    >
                      {item?.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <h1
                onClick={() => {
                  setDropDownCard(false);
                  setSplDropDownCard((prev) => !prev);
                }}
                className={`ml-4 text-white font-bold mb-3 sm:mb-0  `}
              >
                Specials
              </h1>
              {splDropDownCard && (
                <div className="bg-white w-[190px]  rounded-lg absolute top-12 p-4 hidden  md:grid grid-cols-1 gap-3 ">
                  {specials.map((item, idx) => (
                    <Link
                      className="hover:bg-slate-100"
                      onClick={() => {
                        setOpen(false);
                        setSplDropDownCard(false);
                      }}
                      href={`/special/${item?.page}`}
                      key={idx}
                    >
                      {item?.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={"/favorite"}>
              <h1
                onClick={() => {
                  setDropDownCard(false);
                  setSplDropDownCard(false);
                }}
                className={`ml-4 text-white font-bold mb-3 sm:mb-0 ${
                  path === "/favorite" ? "underline" : ""
                } `}
              >
                Favorite
              </h1>
            </Link>
          </div>
          <div className="flex space-x-2 sm:space-y-0  justify-center items-center sm:flex-row order-1 sm:order-2">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search Movie Name"
                onChange={(e) => {
                  // setInput(e.target.value);
                  setToggle(true);
                  dispatch(searchInputHandler(e.target.value));
                }}
                value={searchInput}
                className="py-2 px-4 border border-gray-300  focus:outline-none focus:ring focus:border-blue-300"
              />
              {tabToggle && (
                <div
                  ref={menuRef}
                  className="bg-gray-800    absolute w-full h-[200px] overflow-hidden overflow-y-auto -bottom-48"
                >
                  {searchData.length ? (
                    searchData.map((e, idx) => (
                      <SearchTabComponent
                        tabHandler={() => setToggle()}
                        key={idx}
                        {...e}
                      />
                    ))
                  ) : (
                    <h1 className="text-red-500 text-center mt-[80px] my-auto">
                      no results{" "}
                    </h1>
                  )}
                </div>
              )}
            </div>
            <Link href={`/search-movies/${searchInput}`}>
              <button
                onClick={submitHandler}
                className=" text-white border-2 font-semibold py-2 px-3 rounded-lg flex items-center"
              >
                <AiOutlineSearch size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={` w-full   flex flex-col md:items-center bg-slate-600 md:pb-0 py-8 md:hidden absolute md:static   md:z-auto left-0  md:w-auto md:pl-0  transition-all duration-500 z-20 ease-in ${
          open ? "top-16 " : "top-[-490px]"
        }`}
      >
        <div className="   ">
          <div className="flex  w-full py-4   ">
            <div className="relative flex justify-between items-center px-3  w-full ">
              <input
                type="text"
                onChange={(e) => {
                  // setInput(e.target.value);
                  setToggle(true);
                  dispatch(searchInputHandler(e.target.value));
                }}
                value={searchInput}
                className="py-2 w-[70%]  border border-gray-300  focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Search Movie Name"
              />
              <Link className="" href={`/search-movies/${searchInput}`}>
                <button
                  onClick={submitHandler}
                  className=" text-white mr-5 border-2 font-semibold py-2 px-3 rounded-lg flex items-center"
                >
                  <AiOutlineSearch size={20} />
                </button>
              </Link>
              {tabToggle && (
                <div
                  ref={menuRef}
                  className="bg-gray-800    absolute w-full h-[200px] overflow-hidden overflow-y-auto -bottom-48"
                >
                  {searchData.length ? (
                    searchData.map((e, idx) => (
                      <SearchTabComponent
                        tabHandler={() => setToggle()}
                        clearInput={clearInput}
                        key={idx}
                        {...e}
                      />
                    ))
                  ) : (
                    <h1 className="text-red-500 text-center mt-[80px] my-auto">
                      no results{" "}
                    </h1>
                  )}
                </div>
              )}
            </div>
          </div>

          <Link href={"/favorite"}>
            <h1
              onClick={() => setOpen(false)}
              className={`ml-4 text-white font-bold mb-3 sm:mb-0 ${
                path === "/favorite" ? "" : ""
              } `}
            >
              Favorite
            </h1>
          </Link>
          <div className="flex justify-between items-center my-3">
            <h1 className={`ml-4 text-white font-bold  `}>Categories</h1>

            <div
              onClick={() => setDropDown((prev) => !prev)}
              className="mr-5 text-white"
            >
              {!dropDown ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
            </div>
          </div>
          {dropDown && (
            <div
              className={`flex flex-col  overflow-y-auto    space-y-1 items-center  divide-y-2  ${
                dropDown && "h-[400px]"
              }  `}
            >
              {moviesList?.genres?.map((item, idx) => (
                <Link
                  className="w-full mx-auto px-5 py-2 text-white font-semibold"
                  onClick={() => {
                    setOpen(false);
                    setDropDown(false);
                  }}
                  href={`/category/${item?.id}`}
                  key={idx}
                >
                  {item?.name}
                </Link>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center">
            <h1 className={`ml-4 text-white font-bold  `}>Specials</h1>

            <div
              onClick={() => setSplDropDown((prev) => !prev)}
              className="mr-5 text-white"
            >
              {!splDropDown ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
            </div>
          </div>
          {splDropDown && (
            <div
              className={`flex flex-col  overflow-y-auto    space-y-1 items-center  divide-y-2  ${
                splDropDown && "h-[300px]"
              }  `}
            >
              {specials?.map((item, idx) => (
                <Link
                  className="w-full mx-auto px-5 py-2 text-white font-semibold"
                  onClick={() => {
                    setOpen(false);
                    setSplDropDown(false);
                  }}
                  href={`/special/${item?.page}`}
                  key={idx}
                >
                  {item?.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
