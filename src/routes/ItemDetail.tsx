import React from "react";
import Carousel from "../components/Carousel";

export const itemDetailRoute = {
  path: "item-detail",
  element: <ItemDetail />,
  loader: async () => {
    return null;
  },
};

export default function ItemDetail() {
  const ratingStars = (
    <div className="rating rating-sm rating-half">
      <input type="radio" name="rating-10" className="rating-hidden" />
      <input
        type="radio"
        name="rating"
        className="bg-green-500 mask mask-star-2 mask-half-1"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-2"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-1"
        checked
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-2"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-1"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-2"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-1"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-2"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-1"
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-green-500 mask mask-star-2 mask-half-2"
      />
    </div>
  );

  const ratings = (
    <div>
      <span>4.5/5</span>
      {ratingStars}
    </div>
  );

  // use button key to toggle active / inactive state
  const options = (
    <div className="mt-2 space-y-1">
      <p>Options</p>
      <div className="space-x-2">
        <button className="btn btn-outline btn-primary btn-sm">Option 1</button>
        <button className="btn btn-outline btn-primary btn-sm">Option 2</button>
      </div>
    </div>
  );

  const itemDetailText = (
    <div className="flex flex-col justify-between pb-8 sm:pb-0 sm:w-1/2">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Some Title</h1>
        <p>$190</p>
        {ratings}
        <p>
          This is some rather long description about the product. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
      <div className="space-y-4">
        {options}
        <button className="btn btn-primary w-full">Add to Cart</button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap p-8 h-96 sm:h-[40rem] sm:p-16 gap-10 sm:flex-nowrap">
      <Carousel />
      {itemDetailText}
    </div>
  );
}
