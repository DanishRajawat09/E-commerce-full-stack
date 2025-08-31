import React, { useState } from "react";
import "./filterStyle.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterOpen } from "../../../features/stateSlice";

const Filter = () => {
  const [slctSize, setSize] = useState("");
  const [rangeVal, setRangeVal] = useState(0);
  const openFilter = useSelector((state) => state.state.filOpen);
  const dispatch = useDispatch();

  return (
    <aside
      className={`filterSection ${
        openFilter ? "show" : ""
      } p-6 border border-black/10 rounded-2xl h-fit`}
    >
      {/* Heading */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Filters</h2>
        <img
          className="filterArrowLeft cursor-pointer"
          onClick={() => dispatch(filterOpen({ filOpen: false }))}
          width={30}
          height={30}
          src="arrowLeft.svg"
          alt="arrow"
        />
      </div>

      <hr className="border border-black/10 my-6" />

      {/* Categories */}
      <div className="flex flex-col gap-5 text-[var(--color-subtext)]">
        <div>T-Shirts</div>
        <div>Shorts</div>
        <div>Shirts</div>
        <div>Jeans</div>
        <div>Hoodie</div>
      </div>

      <hr className="border border-black/10 my-6" />

      {/* Price */}
      <h2 className="text-xl font-semibold mb-5">Price</h2>
      <div className="rangeContainer">
        <input
          type="range"
          className="customRange"
          min={100}
          max={10000}
          onChange={(e) => setRangeVal(e.target.value)}
        />
        <p className="mt-2">${rangeVal}</p>
      </div>

      <hr className="border border-black/10 my-6" />

      {/* Colors */}
      <h2 className="text-xl font-semibold mb-5">Colors</h2>
      <hr className="border border-black/10 my-6" />

      {/* Size */}
      <h2 className="text-xl font-semibold mb-5">Size</h2>
      <div className="flex flex-wrap gap-2">
        {[
          "XX-Small",
          "X-Small",
          "Small",
          "Medium",
          "Large",
          "X-Large",
          "XX-Large",
          "3X-Large",
          "4X-Large",
        ].map((size) => (
          <button
            key={size}
            onClick={() => setSize(size)}
            className={`px-3 py-1 border rounded ${
              slctSize === size ? "bg-black text-white" : "bg-transparent"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <hr className="border border-black/10 my-6" />

      {/* Dress Style */}
      <h2 className="text-xl font-semibold mb-5">Dress Style</h2>
      <div className="flex flex-col gap-4 text-[var(--color-subtext)]">
        {["Casual", "Formal", "Party", "Gym"].map((style) => (
          <NavLink key={style} to="">
            <button className="w-full text-left">{style}</button>
          </NavLink>
        ))}
      </div>

      {/* Apply Filter Button */}
      <button className="mt-5 bg-black text-white w-full py-3 rounded-full cursor-pointer">
        Apply Filter
      </button>
    </aside>
  );
};

export default Filter;
