import React from "react";
import Card from "./Card";

interface CardProps {
  name: string;
  description: string;
  isNew: boolean;
  price: string;
  tags: string[];
  image: string;
}

export default function Gallery() {
  const DUMMY_DATA: CardProps[] = [
    {
      name: "Shoes",
      description: "If a dog chews shoes whose shoes does he choose?",
      isNew: true,
      price: "$320",
      tags: ["Fashion", "Products"],
      image:
        "https://www.highsnobiety.com/static-assets/dato/1682600627-kith-adidas-clarks-samba-2.jpg",
    },
    {
      name: "Shoes",
      description: "If a dog chews shoes whose shoes does he choose?",
      isNew: true,
      price: "$220",
      tags: ["Fashion", "Test"],
      image:
        "https://www.highsnobiety.com/static-assets/dato/1682600627-kith-adidas-clarks-samba-2.jpg",
    },
    {
      name: "Shoes",
      description: "If a dog chews shoes whose shoes does he choose?",
      isNew: false,
      price: "$420",
      tags: ["Fashion", "Products"],
      image:
        "https://www.highsnobiety.com/static-assets/dato/1682600627-kith-adidas-clarks-samba-2.jpg",
    },
    {
      name: "Shoes",
      description: "If a dog chews shoes whose shoes does he choose?",
      isNew: false,
      price: "$420",
      tags: ["Fashion", "Products"],
      image:
        "https://www.highsnobiety.com/static-assets/dato/1682600627-kith-adidas-clarks-samba-2.jpg",
    },
    {
      name: "Shoes",
      description: "If a dog chews shoes whose shoes does he choose?",
      isNew: false,
      price: "$420",
      tags: ["Fashion", "Products"],
      image:
        "https://www.highsnobiety.com/static-assets/dato/1682600627-kith-adidas-clarks-samba-2.jpg",
    },
  ];
  return (
    <div className="flex flex-wrap gap-12 m-12">
      {DUMMY_DATA.map((item) => (
        <Card {...item} />
      ))}
    </div>
  );
}
