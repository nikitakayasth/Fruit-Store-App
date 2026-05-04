import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function OrdersDetails() {
  const { id } = useParams();
  let [order, setOrder] = useState(null);
  useEffect(() => {
    //remerber syntax here you for get => this
    fetch(`http://localhost:3000/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [id]);
  //   🛒 Order Details
  // Order ID: 5
  // Date: 2026-03-30

  // Apple - ₹120 x 2 = ₹240
  // Mango - ₹150 x 1 = ₹150

  // Total: ₹390

  if (!order) return <h1>data loading</h1>;
  console.log(order);
  const createMsg = () => {
    // if (!order) return "";
    let msg = `Order Details:\n Order Id:${order.id}\nDate:${order.date}\n\n`;

    order.items.forEach((item) => {
      msg += `${item.name}-₹${item.price}x${item.qty}=₹${item.price * item.qty}\n\n`;
    });
    msg += `Total :${order.totalAmount}`;
    return encodeURIComponent(msg);
  };

  return (
    <>
      <div className="container">
        <h2 className="text-start mt-2">Order Id : {order.id}</h2>
        <p className="text-start">Date : {order.date}</p>
        <table className="w-75 mx-auto">
          <thead>
            <tr className="table-row">
              <th>Fruit</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="table-row">
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                {/* <td>{item.price * item.qty}</td> */}
                <td>{(item.price-((item.price*item.discount)/100)*item.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-end m-3" style={{ fontSize: "40px" }}>
          TotalAmount : ₹{order.totalAmount}
        </div>

        <div className="text-start m-2">
          <button
            className="btn btn-success"
            onClick={() => {
              let message = createMsg();
              window.open(`https://wa.me/?text=${message}`);
            }}
          >
            Share via WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}
