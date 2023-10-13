import React from "react";
import Card from "./Card";

interface CardProps {
  name: string;
  description: string;
  isNew: boolean;
  price: string;
  tags: string[];
  images: string[];
}

export default function Gallery() {
  const DUMMY_DATA: CardProps[] = [
    {
      name: "1 Month Personal Training Subscription",
      description:
        "With 6 supervised training sessions each month, you will benefit from \
        dedicated one-to-one sessions with your personal trainer, designed to be \
        unique and progressive to take you through all facets of your fitness development, \
        allowing you to focus on just one thing – your results.",
      isNew: true,
      price: "$420",
      tags: ["Health", "Wellness"],
      images: [
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1614928228253-dc09cbc3b11c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3394&q=80",
      ],
    },
    {
      name: "6 Months Personal Training Subscription",
      description:
        "With 10 supervised training sessions each month, you will benefit from \
        dedicated one-to-one sessions with your personal trainer, designed to be \
        unique and progressive to take you through all facets of your fitness development, \
        allowing you to focus on just one thing – your results. \
        We will conduct an initial physical analysis to create a regime specifically \
        tailored for you, potential injuries, limitations and nutrition. You will then be \
        guided through an entire programme of health and fitness development, which includes \
        your training inside and outside the gym, your diet and your lifestyle, complemented \
        by the outstanding support services from some of the best personal trainers in Singapore.",
      isNew: true,
      price: "$2500",
      tags: ["Fashion", "Test"],
      images: [
        "https://images.unsplash.com/photo-1533560696583-6441b753a16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1643142313112-3b9faa5dc015?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1643142313816-0d9c86c49f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3440&q=80",
      ],
    },
    {
      name: "1 Month Crossfit Subscription",
      description:
        "With this, you have access to 6 workouts in a month which are unique from \
        day to day, combining elements from barbell work to gymnastics. Even though \
        you might not know what to expect going in, one thing for certain is that you \
        will walk out with a wide grin on your face knowing you are better than when you entered.",
      isNew: false,
      price: "$380",
      tags: ["Health", "Wellness"],
      images: [
        "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3542&q=80",
        "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3304&q=80",
      ],
    },
    {
      name: "6 Months Crossfit Subscription",
      description:
        "With this, you have access to 10 workouts in a month which are unique from \
        day to day, combining elements from barbell work to gymnastics. Even though \
        you might not know what to expect going in, one thing for certain is that you \
        will walk out with a wide grin on your face knowing you are better than when you entered.",
      isNew: false,
      price: "$2100",
      tags: ["Health", "Wellness"],
      images: [
        "https://images.unsplash.com/photo-1623946724787-1d57bb1d2c87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1639504031765-ca21aecb7252?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
      ],
    },
    {
      name: "3 Months Boxing Subscription",
      description:
        "This class focuses on the refinement of fundamental combos, footworks \
        and partner drills that are essential yet beginner friendly. Get the chance \
        to learn from fellow members of different skill levels.",
      isNew: false,
      price: "$1000",
      tags: ["Health", "Wellness"],
      images: [
        "https://images.unsplash.com/photo-1636581563711-cd454f1bf99a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1636581563815-9c40c35abe0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1517438322307-e67111335449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
      ],
    },
    {
      name: "3 Sessions Restorative Stretch Therapy",
      description:
        "A specialized stretch therapist will assess your physical condition and customize a series of passive, active-assistive and dynamic stretches to meet your fitness requirements.",
      isNew: false,
      price: "$100",
      tags: ["Health", "Wellness"],
      images: [
        "https://images.unsplash.com/photo-1540206063137-4a88ca974d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1645005512942-a17817fb7c11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      ],
    },
    {
      name: "Myprotein Impact Whey Protein (1kg)",
      description:
        "It’s convenient, high-quality protein that helps grow and maintain \
        important muscle — and with just 1.9g of fat, 1g of carbs, and only \
        103 calories per serving, it’s here to support all your fitness goals.\
        It also includes the essential amino acids, including 4.5g of BCAAs — \
        these naturally occur in protein which helps to build and repair new muscle  \
        — so you’re always ready for the next session.",
      isNew: false,
      price: "$55",
      tags: ["Health", "Supplements"],
      images: [
        "https://ultimatesupsg.com/cdn/shop/products/real_1024x1024.jpg?v=1679310810",
        "https://ultimatesupsg.com/cdn/shop/products/BrownRiceTeaLatte1kg_1024x1024.jpg?v=1679311295",
        "https://ultimatesupsg.com/cdn/shop/products/Yoghurt250g_1024x1024.jpg?v=1679311613",
        "https://ultimatesupsg.com/cdn/shop/products/Hokkaido250g_1024x1024.jpg?v=1679311739",
        "https://ultimatesupsg.com/cdn/shop/products/Matcha250g_1024x1024.jpg?v=1679311844",
      ],
    },
    {
      name: "MYPRO Metal Shaker (700ml)",
      description:
        "Crafted from 100% stainless steel, this Metal Shaker is perfect for mixing \
        supplements on the go —from weight-gainers and protein blends, to amino \
        acids and creatine — stay on top of your nutrition, wherever you are.",
      isNew: false,
      price: "$50",
      tags: ["Health", "Products"],
      images: [
        "https://static.thcdn.com/productimg/1600/1600/12893421-2144878301096713.jpg",
        "https://static.thcdn.com/productimg/1600/1600/12893421-2044878301127772.jpg",
        "https://static.thcdn.com/productimg/1600/1600/12893421-1494878301240116.jpg",
        "https://static.thcdn.com/productimg/1600/1600/12893421-1714878301290168.jpg",
      ],
    },
  ];
  return (
    <div className='flex flex-wrap gap-12 m-12 justify-center'>
      {DUMMY_DATA.map((item) => (
        <Card {...item} />
      ))}
    </div>
  );
}
