import React from "react";

export default function Carousel() {
  let imgUrl =
    "https://www.highsnobiety.com/static-assets/dato/1682600627-kith-adidas-clarks-samba-2.jpg";

  return (
    <div className="carousel w-full sm:w-1/2 h-96">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={imgUrl} className="w-full object-cover" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={imgUrl} className="w-full object-cover" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://www.highsnobiety.com/static-assets/thumbor/sab6HEJ0rvqhW_x8xid7oROwtRA=/fit-in/1080x1350/aaba6fc7dd05e6321705-d3c8e77fedf34b64ceac1fa28b6c145b.ssl.cf3.rackcdn.com/CONVERSE_DRKSHDW_TUR-SHA21AXg.jpg"
          className="w-full object-cover"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://www.highsnobiety.com/static-assets/thumbor/YtRh482GlN9tA_1DoTRHID9O5Ls=/fit-in/790x987/https://aaba6fc7dd05e6321705-d3c8e77fedf34b64ceac1fa28b6c145b.ssl.cf3.rackcdn.com/VEJA_V-10_Camel_3611-oEIipgQ3.jpg"
          className="w-full object-cover"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}
