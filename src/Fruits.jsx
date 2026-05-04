// export default function Fruits() {
//   return (
//     <>
//       <h1 className="text-start my-2 p-4">Fruit list </h1>

//     </>
//   );
// }
import { useNavigate } from "react-router-dom";
import fruit from "./data/fruit.json";

//import { useState } from "react";
import Image from "./Image";

export default function Fruits(props) {
  let { addToCart } = props;
  let { increaseQty } = props;
  let { decreaseQty } = props;
  //let {productList}=props
  let { cart } = props;
  let Navigate = useNavigate();
  let productList = fruit.fruits;
  //let user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="container-fluid my-1">
        <h1 className=" text-center">Fruits </h1>
        <div className="row">
          {productList.map((product) => {
            const item = cart.find((i) => i.id === product.id);

            return (
              <div
                className="col-12 col-sm-6 col-lg-3 p-2 container-product my-1"
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

                  <div className="row align-items-center">
                    {item ? (
                      <>
                        <div className="col-4">
                          <button
                            className="btn btn-danger w-100 font-weight-bold"
                            onClick={() => {
                              decreaseQty(product.id);
                            }}
                          >
                            -
                          </button>
                        </div>

                        <div className="col-4">{item.qty}</div>

                        <div className="col-4">
                          <button
                            className="btn btn-danger w-100"
                            onClick={() => {
                              increaseQty(product.id);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="col-4 mx-auto w-75">
                        <button
                          className="btn btn-danger w-100 font-weight-bold "
                          onClick={() => {
                            // console.log("clicked");

                            const user = JSON.parse(
                              localStorage.getItem("loggedInUser"),
                            );
                            console.log(user);
                            if (!user) {
                              alert("plz login first");
                              Navigate("/login");
                              return;
                            }

                            addToCart(product);
                          }}
                        >
                          Add to Card
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
