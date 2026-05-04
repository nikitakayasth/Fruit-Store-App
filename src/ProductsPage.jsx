import { useState } from "react";

export default function ProductsPage() {
  let pList = [
    {
      id: "2",
      name: "Alphanso Mango",
      image: "mango.jpg",
      unit: "doz",
      mrp: "500",
      discount: "20",
      inStock: true,
      qty: 0,
      type: "Organic",
      finalPrice: 540,
    },
    {
      id: "4",
      name: "Apple",
      image: "apple.jpg",
      unit: "kg",
      mrp: "200",
      discount: 7,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
      finalPrice: 186,
    },
    {
      id: "5",
      name: "Anjeer",
      image: "anjeer.jpg",
      unit: "kg",
      mrp: 100,
      discount: 0,
      inStock: true,
      qty: 0,
      type: "Organic",
    },
    {
      id: "6",
      name: "Strawberry",
      image: "strawberry.jpg",
      unit: "kg",
      mrp: 200,
      discount: 20,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "7",
      name: "Papaya",
      image: "papaya.jpg",
      unit: "kg",
      mrp: 50,
      discount: 15,
      inStock: true,
      qty: 0,
      type: "Organic",
    },
    {
      id: "8",
      name: "Cherry",
      image: "cherry.jpg",
      unit: "kg",
      mrp: 300,
      discount: 5,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "9",
      name: "Chikoo",
      image: "Chikoo.jpg",
      unit: "kg",
      mrp: 60,
      discount: 5,
      inStock: false,
      qty: 0,
      type: "Organic",
    },
    {
      id: "10",
      name: "Kiwi",
      image: "Kiwi.jpg",
      unit: "piece",
      mrp: 20,
      discount: 0,
      inStock: false,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "11",
      name: "Orange",
      image: "orange.jpg",
      unit: "kg",
      mrp: 200,
      discount: 10,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "12",
      name: "Pear",
      image: "pear.jpg",
      unit: "kg",
      mrp: "250",
      discount: 7,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
      finalPrice: 186,
    },
    {
      id: "13",
      name: "Pineapple",
      image: "pineapple.jpg",
      unit: "piece",
      mrp: "80",
      discount: "0",
      inStock: true,
      qty: 0,
      type: "Non-Organic",
      finalPrice: 90,
    },
    {
      id: "14",
      name: "Pomegranete",
      image: "pomegranete.jpg",
      unit: "kg",
      mrp: 200,
      discount: 5,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "15",
      name: "Sitaphal",
      image: "sitaphal.jpg",
      unit: "kg",
      mrp: 100,
      discount: 10,
      inStock: true,
      qty: 0,
      type: "Organic",
    },
    {
      id: "16",
      name: "Watermelon",
      image: "watermelon.jpg",
      unit: "piece",
      mrp: 80,
      discount: 50,
      inStock: true,
      qty: 0,
      type: "Organic",
    },
    {
      id: "17",
      name: "Sweetlime",
      image: "sweetlime.jpg",
      unit: "kg",
      mrp: 200,
      discount: 5,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "18",
      name: "Peach",
      image: "peach.jpg",
      unit: "kg",
      mrp: 200,
      discount: 10,
      inStock: false,
      qty: 0,
      type: "Non-Organic",
    },
    {
      id: "19",
      name: "Dragon",
      image: "dragon.jpg",
      unit: "piece",
      mrp: 60,
      discount: 0,
      inStock: true,
      qty: 0,
      type: "Non-Organic",
    },
  ];

  let [productList, setProductList] = useState(pList);
  function handleButton(value, i) {
    let p = [...productList];
    if (value == -1 && p[i].qty > 0) {
      p[i].qty += value;
    } else if (value == 1) {
      p[i].qty += value;
    }
    setProductList(p);
  }

  return (
    <>
      <h1>welcome to shop</h1>

      <div className="container-fluid">
        <div className="row">
          {productList.map((product, index) => (
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
                {product.discount == 0 && (
                  <div className=" product-price text-center m-1">
                    Rs.{product.mrp}{" "}
                    {/* {product.mrp - (product.mrp * product.discount) / 100} */}
                  </div>
                )}

                {product.discount != 0 && (
                  <div className=" product-price text-center m-1">
                    Rs.{product.mrp}{" "}
                    {product.mrp - (product.mrp * product.discount) / 100}
                  </div>
                )}
                {product.qty == 0 && (
                  <div className="col-4 mx-auto w-75">
                    {product.inStock && (
                      <button
                        className="btn btn-danger w-100 font-weight-bold "
                        onClick={() => {
                          handleButton(1, index);
                        }}
                      >
                        Add to Card
                      </button>
                    )}

                    {!product.inStock && (
                      <button
                        className="btn btn-secondary w-100 font-weight-bold "
                        onClick={() => {
                          handleButton(-1, index);
                        }}
                      >
                        Out of Stack
                      </button>
                    )}
                  </div>
                )}
                {product.qty != 0 && (
                  <div className="row align-items-center">
                    <div className="col-4">
                      <button
                        className="btn btn-danger w-100 font-weight-bold"
                        onClick={() => {
                          handleButton(-1, index);
                        }}
                        // disabled={product.qty==0}
                      >
                        -
                      </button>
                    </div>
                    <div className="col-4">{product.qty}</div>
                    <div className="col-4">
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => {
                          handleButton(1, index);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
