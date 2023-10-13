import { useNavigate } from "react-router-dom";

export interface CardProps {
  name: string;
  description: string;
  isNew: boolean;
  price: string;
  tags: string[];
  images: string[];
}

export default function Card({
  name,
  description,
  isNew,
  price,
  tags,
  images,
}: CardProps) {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/item-detail", {
      state: {
        name,
        description,
        isNew,
        price,
        tags,
        images,
      },
    });
  };
  return (
    <div
      className='card w-full sm:max-w-sm bg-base-300 shadow-xl cursor-pointer hover:scale-[1.02] hover:opacity-80 transition'
      onClick={onClickHandler}
    >
      <figure>
        <img src={images[0]} alt='Shoes' />
      </figure>
      <div className='card-body text-left'>
        <div className='flex'>
          <h2 className='card-title'>{name}</h2>
          <div className='grow' />
          <div className='font-bold text-2xl'>{price}</div>
        </div>
        <div className='card-description'>
          <p className='description-limit'>{description}</p>
        </div>
        <div className='inline flex justify-between'>
          <div className='card-actions justify-end'>
            {tags.map((tag) => (
              <div className='badge badge-outline'>{tag}</div>
            ))}
          </div>
          {isNew && <div className='badge badge-secondary'>NEW</div>}
        </div>
      </div>
    </div>
  );
}
