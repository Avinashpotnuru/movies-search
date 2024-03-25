import React, { useState } from "react";
import { tabsHandler } from "@/store/slice/tabsSlice";
import { useDispatch } from "react-redux";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const Pagination = ({ pages }) => {
  const dispatch = useDispatch();
  const [selectedNumber, setSelectedNumber] = useState(1);

  const onCLickPageNumber = (page) => {
    setSelectedNumber(page);
    dispatch(tabsHandler(page));
  };

  const renderPageButtons = () => {
    const totalPages = Math.ceil(pages / 20); // Assuming 20 items per page

    let startPage = Math.max(1, selectedNumber - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`px-3 py-2 ${
            selectedNumber === i
              ? "bg-slate-900 text-slate-50"
              : "bg-slate-500 text-slate-50"
          } rounded-md`}
          onClick={() => onCLickPageNumber(i)}
          type="button"
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex flex-col justify-center overflow-x-auto max-w-full">
      <div className="flex space-x-2 pt-4">
        {selectedNumber > 1 && (
          <button
            className="px-3 py-2 bg-slate-left text-slate-50 rounded-md"
            onClick={() => onCLickPageNumber(selectedNumber - 1)}
            type="button"
          >
            <FaAnglesLeft />
          </button>
        )}
        {renderPageButtons()}
        {selectedNumber < Math.ceil(pages / 20) && (
          <button
            className="px-3 py-2 bg-slate-right text-slate-50 rounded-md"
            onClick={() => onCLickPageNumber(selectedNumber + 1)}
            type="button"
          >
            <FaAnglesRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
