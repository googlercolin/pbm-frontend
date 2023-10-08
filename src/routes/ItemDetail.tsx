
import React from 'react'
import Carousel from '../components/Carousel';

export const itemDetailRoute = {
    path: "item-detail",
    element: <ItemDetail />,
    loader: async () => {
        return null;
    },
};


export default function ItemDetail() {
  return (
    <Carousel/>
  )
}
