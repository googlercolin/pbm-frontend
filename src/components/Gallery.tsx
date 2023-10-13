import React from "react";
import Card from "./Card";

interface CardProps {
  name: string;
  description: string;
  isNew: boolean;
  price: string;
  tags: string[];
  image: string[];
}

export default function Gallery() {
  const DUMMY_DATA: CardProps[] = [
    {
      name: "1 Month Personal Training Subscription",
      description: "6 supervised training sessions each month",
      isNew: true,
      price: "$420",
      tags: ["Health", "Wellness"],
      image: [
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
      ],
    },
    // {
    //   name: "6 Months Personal Training Subscription",
    //   description: "10 supervised training sessions each month",
    //   isNew: true,
    //   price: "$4000",
    //   tags: ["Fashion", "Test"],
    //   image:
    //     "https://images.unsplash.com/photo-1533560696583-6441b753a16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    // },
    // {
    //   name: "1 Month Crossfit Subscription",
    //   description: "6 supervised training sessions each month",
    //   isNew: false,
    //   price: "$380",
    //   tags: ["Health", "Wellness"],
    //   image:
    //     "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    // },
    // {
    //   name: "Restorative Stretch Therapy",
    //   description:
    //     "A specialized stretch therapist will assess your physical condition and customize a series of passive, active-assistive and dynamic stretches to meet your fitness requirements.",
    //   isNew: false,
    //   price: "$420",
    //   tags: ["Fashion", "Products"],
    //   image:
    //     "https://images.unsplash.com/photo-1540206063137-4a88ca974d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    // },
    // {
    //   name: "Shoes",
    //   description: "If a dog chews shoes whose shoes does he choose?",
    //   isNew: false,
    //   price: "$420",
    //   tags: ["Fashion", "Products"],
    //   image:
    //     "https://www.highsnobiety.com/static-assets/dato/1682600627-kith-adidas-clarks-samba-2.jpg",
    // },
  ];
  return (
    <div className='flex flex-wrap gap-12 m-12 justify-center'>
      {DUMMY_DATA.map((item) => (
        <Card {...item} />
      ))}
    </div>
  );
}
