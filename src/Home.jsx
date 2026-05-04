import { useNavigate } from "react-router-dom";
import Fruit from "./data/Fruit.json";
//import { useState } from "react";
export default function Home() {
  let Navigate = useNavigate();

  return (
    <>
      {/* <h1>Welcome to Fruit shop</h1>
      <div>buy fresh fruit online</div> */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('/fruitImages/fruit-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "480px",
          width: "100%",
        }}
        className="row align-content-center justify-content-center text-center text-white m-1"
      >
        <div>
          <h1 className="display-4 fw-bold text-white">
            Fresh Fruits Deliverd daily{" "}
          </h1>
          <p>.Healthy .Organic .farm Fresh</p>
        </div>
        <div className="my-2">
          <button className="btn btn-warning">Shop</button>
        </div>
      </div>
      <h1 className="text-center">Today's offers</h1>
      <div className="row  justify-content-around ">
        <div className="col-3 text-center border border-1 rounded-1 p-4">
          <h2>10% OFF Apples</h2>
          <p>Fresh kashmiri Apples</p>
        </div>
        <div className="col-3 text-center border border-1 rounded-1 p-4">
          <h2>10% OFF Apples</h2>
          <p>Fresh kashmiri Apples</p>
        </div>
        <div className="col-3 text-center border border-2 rounded-1 p-4">
          <h2>10% OFF Apples</h2>
          <p>Fresh kashmiri Apples</p>
        </div>
      </div>
      <div>
        <div className="row  justify-content-around align-content-center my-4  ">
          <div className="col-5  p-2">
            <h2 className="text-start" style={{ fontSize: "40px" }}>
              Featured fruit
            </h2>
          </div>
          <div className="col-5 text-end p-2 ">
            <button
              className="btn btn-primary  "
              onClick={() => Navigate("/fruits")}
            >
              {" "}
              SEE All
            </button>
          </div>
        </div>

        {/* // <button onClick={() => Navigate("/fruits")}>Shop All</button> */}
        <div className="row justify-content-around">
          {Fruit.fruits.slice(0, 6).map((product) => (
            <div
              className="col-12 col-sm-6 col-lg-4 p-2 container-product my-1"
              key={product.id}
            >
              <div className="border border-1 p-3 rounded-3 ">
                <div className="text-center m-1">
                  <img src={"fruitImages/" + product.image} alt="" />
                </div>
                <div className=" product-name text-center m-1">
                  {product.name}
                </div>
                {/* 0 discount  */}

                <div className=" product-price text-center m-1">
                  Rs.{product.price}{" "}
                </div>
                <div className=" product-discount text-center text-danger m-1">
                  {product.discount}% OFF{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
