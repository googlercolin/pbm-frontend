import Carousel from "../components/Carousel";
import { useLocation } from "react-router-dom";
import { CardProps } from "../components/Card";
import { useWeb3 } from "../hooks/useWeb3";
import { useGetPBMToken } from "../hooks/useGetPBMToken";
import { useBuy } from "../hooks/useBuy";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useTokenWrapperContract } from "../hooks/useTokenWrapper";
import { useTokenManager } from "../hooks/useTokenManager";
import { Tokens, VoucherRowProps } from "./TokenPage";

export const itemDetailRoute = {
  path: "item-detail",
  element: <ItemDetail />,
  loader: async () => {
    return null;
  },
};

interface SelectedToken {
  index: number;
  amount: string;
}

export default function ItemDetail() {
  const location = useLocation();
  const state: CardProps = location.state;
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [tokens, setTokens] = useState<Tokens[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<SelectedToken[]>([]);
  const [voucherLoading, setVoucherLoading] = useState<boolean>(false);

  // Networking
  const { tokenWrapperAddress } = useGetPBMToken();
  const { buy } = useBuy();
  const { account } = useWeb3();
  const { balanceOfBatch } = useTokenWrapperContract();
  const { getTokenTypes } = useTokenManager();

  const compare = (a: any, b: any) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const successTimeout = setTimeout(() => setSuccess(false), 3000);
    const errorTimeout = setTimeout(() => setError(""), 3000);
    return () => {
      clearTimeout(successTimeout);
      clearTimeout(errorTimeout);
    };
  }, [success, error]);

  useEffect(() => {
    const fetchData = async () => {
      setVoucherLoading(true);
      const tokens = await getTokenTypes();
      const tokenIDs = tokens?.map((token, i) => i);
      if (account && tokenIDs) {
        const balances = await balanceOfBatch(account.address, tokenIDs);
        const types = await getTokenTypes();
        const updatedTokens: Tokens[] = [];
        if (types) {
          for (let i = 0; i < types.length; i++) {
            const denomination = types[i].denomination;
            const expiryDate = types[i].expiryDate;
            const balance = balances[i];

            // Create a new token object
            const token: VoucherRowProps = {
              value: Number(denomination) / 1000000,
              amount: Number(balance),
              expiry: new Date(Number(expiryDate) * 1000).toDateString(),
            };

            // Find or create the corresponding category
            const category = "Health and Wellness";
            let categoryToken = updatedTokens.find(
              (t) => t.category === category
            );

            if (!categoryToken) {
              categoryToken = {
                category,
                availTokens: [],
              };
              updatedTokens.push(categoryToken);
            }

            // Add the token to the category
            categoryToken.availTokens.push(token);
          }
        }
        updatedTokens[0].availTokens.sort(compare);
        setTokens(updatedTokens);
        setVoucherLoading(false);
      }
    };

    fetchData();
  }, [balanceOfBatch, getTokenTypes, account, success]);

  useEffect(() => {
    // Initialise selectedTokens
    if (tokens.length > 0) {
      setSelectedTokens(
        tokens[0].availTokens.map((token, i) => ({ index: i, amount: "0" }))
      );
    }
  }, [tokens]);

  const buyButtonHandler = async () => {
    setLoading(true);
    if (account && tokenWrapperAddress) {
      try {
        await buy(
          Number(state.price.slice(1)),
          selectedTokens.map((token) => token.index),
          selectedTokens.map((token) => Number(token.amount))
        ); // Hardcoded number for now
        setLoading(false);
        setSuccess(true);
      } catch (error) {
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

  const calculateVoucherValue = () => {
    let total = 0;
    for (let i = 0; i < selectedTokens.length; i++) {
      total +=
        Number(selectedTokens[i].amount) * tokens[0].availTokens[i].value;
    }
    return total;
  };

  const updateCount = (index: number, value: number) => {
    // Prevent negative values
    if (
      Number(selectedTokens[index].amount) + value < 0 ||
      Number(selectedTokens[index].amount) + value >
        tokens[0].availTokens[index].amount
    ) {
      return;
    }

    const updatedTokens = [...selectedTokens];
    updatedTokens[index].amount = `${
      Number(updatedTokens[index].amount) + value
    }`;
    setSelectedTokens(updatedTokens);
  };

  const stepper = (index: number) => {
    return (
      <div className="flex items-center gap-2 w-sm">
        <button
          className="btn btn-secondary"
          onClick={() => updateCount(index, -1)}
        >
          -
        </button>
        <input
          type="number"
          className="input text-center w-32 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={
            index < selectedTokens.length ? selectedTokens[index].amount : ""
          }
          onChange={(e) => {
            console.log(e.target.value);
            if (
              (Number(e.target.value) < 0 ||
                Number(e.target.value) > tokens[0].availTokens[index].amount) &&
              e.target.value !== ""
            ) {
              return;
            }
            const updatedTokens = [...selectedTokens];
            updatedTokens[index].amount = e.target.value;
            setSelectedTokens(updatedTokens);
          }}
        />
        <button
          className="btn btn-primary"
          onClick={() => updateCount(index, 1)}
        >
          +
        </button>
      </div>
    );
  };

  // use button key to toggle active / inactive state
  const options = (
    <div className="flex gap-2">
      {state.tags.map((tag) => (
        <div key={tag} className="badge badge-outline">
          {tag}
        </div>
      ))}
      {state.isNew && <div className="badge badge-secondary">NEW</div>}
    </div>
  );

  const voucherSection = (
    <div className="flex flex-col w-full gap-2 py-8">
      {tokens.map((token, tokenCategoryIndex) => (
        <>
          <div key={token.category} className="flex flex-col gap-2 w-full">
            <h1 className="text-xl font-bold">
              {token.category + " vouchers"}
            </h1>
            <div className="flex flex-col gap-2">
              {token.availTokens.map((token, tokenId) => (
                <div
                  key={token.value}
                  className="flex gap-2 bg-neutral-content p-8 rounded-2xl w-full justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-md font-bold">${token.value}</span>
                    <span className="text-xs">Expiry: {token.expiry}</span>
                    <span className="text-sm font-bold">
                      {token.amount} Available
                    </span>
                  </div>
                  {stepper(tokenId)}
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-xl font-bold mt-8">
            {`Voucher value: $${calculateVoucherValue()}`}
          </h1>
        </>
      ))}
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
      {voucherSection}
      <div className="space-y-4">
        <button
          className="btn btn-primary w-full mb-16"
          onClick={buyButtonHandler}
          disabled={calculateVoucherValue() < Number(state.price.slice(1))}
        >
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
      {voucherLoading && (
        <div className="toast toast-center">
          <div className="alert alert-info text-white flex">
            <span>Loading Vouchers</span>
            <span className="loading loading-dots loading-md"></span>
          </div>
        </div>
      )}
      {success && (
        <div className="toast toast-center">
          <div className="alert alert-success flex">
            <span>Transaction Succeeded 😄</span>
          </div>
        </div>
      )}
    </div>
  );
}
