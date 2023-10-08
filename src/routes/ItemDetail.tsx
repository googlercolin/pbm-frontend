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
      <span>4.5/5.0</span>
      {ratingStars}
    </div>
  );

  // use button key to toggle active / inactive state
  const options = (
    <div className="space-y-1">
      <p>Options</p>
      <div className="space-x-2">
        <button className="btn btn-outline btn-primary btn-sm">Option 1</button>
        <button className="btn btn-outline btn-primary btn-sm">Option 2</button>
      </div>
    </div>
  );

  const itemDetailText = (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1>Some Title</h1>
        <p>Price</p>
        {ratings}
        <p>This is some rather long description about the product.</p>
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
