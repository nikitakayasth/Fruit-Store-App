import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  let [orders, setOrders] = useState([]);
  let Navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json()) //
      .then((data) => {
        const myOrders = data.filter((order) => order.userId == user.email);
        setOrders(myOrders);
      });
  }, [user.email]);

  return (
    <>
      <h1 className="text-start my-2 p-4">My orders</h1>
      <table className="w-75 mx-auto">
        <thead>
          <tr className="table-row ">
            <th>Order Id </th>
            <th>Date</th>
            <th>Total Items</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="table-row">
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.items.length}</td>
              <td className="myb">{order.totalAmount}</td>

              <td>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => {
                    Navigate(`/order/${order.id}`);
                  }}
                >
                  view details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
