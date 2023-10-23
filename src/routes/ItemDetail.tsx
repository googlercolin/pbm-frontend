import Carousel from "../components/Carousel";
import { useLocation } from "react-router-dom";
import { CardProps } from "../components/Card";
import { useWeb3 } from "../hooks/useWeb3";
import { useGetPBMToken } from "../hooks/useGetPBMToken";
import { useBuy } from "../hooks/useBuy";
import { useState } from "react";
import { set } from "react-hook-form";


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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { tokenWrapperAddress } = useGetPBMToken();

  const { buy } = useBuy();
  const { account } = useWeb3();

  const buyButtonHandler = () => {
    setLoading(true);
    if (account && tokenWrapperAddress) {
      try {
        buy(53); // Hardcoded number for now
        setLoading(false);
      } catch (error) {
        console.log("here", error);
        setLoading(false);
        setError(String(error));
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
        defaultChecked={true}
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
        <div key={tag} className="badge badge-outline">{tag}</div>
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
      <Carousel imgs={state.images} />
      {itemDetailText}
      {error && (
        <div className="toast toast-center">
          <div className="alert alert-error text-white flex">
            <span>{error}</span>
          </div>
        </div>
      )}
      {loading && (
        <div className="toast toast-center">
          <div className="alert alert-info text-white flex">
            <span>Purchasing item</span>
            <span className="loading loading-dots loading-md"></span>
          </div>
        </div>
      )}
    </div>
  );
}
