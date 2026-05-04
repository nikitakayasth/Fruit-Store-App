export default function Cart(props) {
  let { cart } = props;
  let { increaseQty } = props;
  let { decreaseQty } = props;
  let { removeItem } = props;
  let { placeOrder } = props;
  const total = cart.reduce(
    (sum, item) =>
      sum + ((item.price - ((item.price * item.discount) / 100)) * item.qty),
    0,
  );
  // item.price - ((item.price * item.discount) / 100) * item.qty
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log("logged user");

  if (!user) {
    return <h1>Please login to view cart</h1>;
  }

  return (
    <>
      <h1 className="text-start my-2 p-4"> Your Cart</h1>
      {cart.length == 0 ? (
        <h2>cart is empty</h2>
      ) : (
        <table className="cart-table w-75 mx-auto">
          <thead>
            <tr className="table-row">
              <th> Fruit</th>
              <th>Price</th>
              <th> Qty</th>
              <th>M.R.P</th>
              <th>Total Amount </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="table-row">
                <td>{item.name}</td>
                <td>Rs. {item.price}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>
                  <span className="m-2">{item.qty} </span>
                  <button
                    className="btn btn-success"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                </td>
                <td>Rs.{item.price * item.qty}</td>
                <td>
                  Rs. 
                  {(item.price - ((item.price * item.discount) / 100)) * item.qty}
                </td>
                <td>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => removeItem(item.id)}
                  >
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 className="text-end m-2">Total Amount : Rs {total}</h3>

      <div className="text-end m-2">
        <button className="btn btn-primary" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </>
  );
}
