interface CardProps {
  name: string;
  description: string;
  isNew: boolean;
  price: string;
  tags: string[];
  image: string;
}

export default function Card({
  name,
  description,
  isNew,
  price,
  tags,
  image,
}: CardProps) {
  return (
    <div className="card bg-base-300 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body text-left">
        <div className="flex">
          <h2 className="card-title">
            {name}
            {isNew && <div className="badge badge-secondary">NEW</div>}
          </h2>
          <div className="grow" />
          <div className="font-bold text-2xl">{price}</div>
        </div>
        <p>{description}</p>
        <div className="card-actions justify-end">
          {tags.map((tag) => (
            <div className="badge badge-outline">{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
