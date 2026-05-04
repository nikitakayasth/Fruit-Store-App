import { useEffect, useState } from "react";

export default function AdminFruits() {
  let [fruits, setFruits] = useState([]);
  let [editFruit, setEditFruit] = useState(null);
  let [newFruit, setNewFruit] = useState({
    name: "",
    price: "",
    discount: "",
    image: "",
  });
  console.log(fruits);

  useEffect(() => {
    fetch("http://localhost:3000/fruits")
      .then((res) => res.json())
      .then((data) => setFruits(data));
  }, []);
  const addFruit = () => {
    if (!newFruit.name || !newFruit.price) {
      alert("Please fill all fields");
      return;
    }
    fetch("http://localhost:3000/fruits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFruit),
    })
      .then((res) => res.json())
      .then((data) => {
        (setFruits([...fruits, data]),
          setNewFruit({ name: "", price: "", discount: "", image: "" }));
      })
      .catch((err) => console.log(err));
  };

  // to delete fruit
  const deleteFruit = (id) => {
    fetch(`http://localhost:3000/fruits/${id}`, {
      method: "DELETE",
    }).then(() => {
      setFruits(fruits.filter((f) => f.id !== id));
    });
  };

  // update fruit
  const updateFruit = () => {
    fetch(`http://localhost:3000/fruits/${editFruit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFruit),
    })
      .then((res) => res.json())
      .then((updated) => {
        setFruits(fruits.map((f) => (f.id === updated.id ? updated : f)));
        setEditFruit(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>Add Fruit</h2>

      <div className="form">
        {/* INPUTS */}
        <input
          className="form-input"
          type="text"
          placeholder="Name"
          value={newFruit.name}
          onChange={(e) => setNewFruit({ ...newFruit, name: e.target.value })}
        />
        <input
          className="form-input mb-2"
          placeholder="Price"
          value={newFruit.price}
          onChange={(e) => setNewFruit({ ...newFruit, price: e.target.value })}
        />

        <input
          className="form-input mb-2"
          placeholder="Discount"
          value={newFruit.discount}
          onChange={(e) =>
            setNewFruit({ ...newFruit, discount: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Image"
          value={newFruit.image}
          onChange={(e) => setNewFruit({ ...newFruit, image: e.target.value })}
        />
        {/* ✅ EXACT PLACE */}
        <button className="btn btn-primary" onClick={addFruit}>
          Add Fruit
        </button>
      </div>
      {/*   edit form */}

      {editFruit && (
        <>
          <h2>Edit Fruit</h2>

          <input
            value={editFruit.name}
            onChange={(e) =>
              setEditFruit({ ...editFruit, name: e.target.value })
            }
          />

          <input
            value={editFruit.price}
            onChange={(e) =>
              setEditFruit({ ...editFruit, price: e.target.value })
            }
          />

          <input
            value={editFruit.discount}
            onChange={(e) =>
              setEditFruit({ ...editFruit, discount: e.target.value })
            }
          />

          <input
            value={editFruit.image}
            onChange={(e) =>
              setEditFruit({ ...editFruit, image: e.target.value })
            }
          />

          <button onClick={updateFruit}>Update</button>
        </>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fruits) &&
            fruits.map((f) => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.price}</td>
                <td>{f.discount}%</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setEditFruit(f);
                    }}
                  >
                    {/* <i class="bi bi-pencil-square"></i> */}
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteFruit(f.id);
                    }}
                  >
                    {/* <i class="bi bi-trash">de</i> */}
                    delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
