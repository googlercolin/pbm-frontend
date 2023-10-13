import React from "react";
import Carousel from "../components/Carousel";
import { useLocation } from "react-router-dom";
import { CardProps } from "../components/Card";
import { useTokenWrapperContract } from "../hooks/useTokenWrapper";
import { useWeb3 } from "../hooks/useWeb3";
import { useGetPBMToken } from "../hooks/useGetPBMToken";
import { useBuy } from "../hooks/useBuy";

export const itemDetailRoute = {
  path: "item-detail",
  element: <ItemDetail />,
  loader: async () => {
    return null;
  },
};

export default function ItemDetail() {
  const location = useLocation();
  const state: CardProps = location.state;

  const { tokenWrapperAddress } = useGetPBMToken();

  const { buy } = useBuy();
  const { account } = useWeb3();

  const merchantsAddress = "0xsomething"; // TODO: replace with actual address

  const buyButtonHandler = () => {
    if (account && tokenWrapperAddress) {
      // convert price to number
      try {
        buy(Number(state.price));
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    <div className="flex gap-2">
      {state.tags.map((tag) => (
        <div className="badge badge-outline">{tag}</div>
      ))}
      {state.isNew && <div className="badge badge-secondary">NEW</div>}
    </div>
  );

  const itemDetailText = (
    <div className="flex flex-col justify-between pb-8 sm:pb-0 sm:w-1/2">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">{state.name}</h1>
        <p>{state.price}</p>
        {ratings}
        <p>{state.description}</p>
        {options}
      </div>
      <div className="space-y-4">
        <button className="btn btn-primary w-full" onClick={buyButtonHandler}>
          Buy
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap p-8 h-96 sm:h-[40rem] sm:p-16 gap-10 sm:flex-nowrap">
      <Carousel imgs={state.image} />
      {itemDetailText}
    </div>
  );
}
