import * as firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirestore } from "./firebase/index";
import Item from "./Item";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemCollection = db.collection("items");

    itemCollection
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          console.log("No Reusults!");
        }
        setItems(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addOrder = () => {
    const db = getFirestore();

    const orders = db.collection("orders");

    const newOrder = {
      buyer: {
        name: "Pablo Marquez",
        city: "Córdoba",
        email: "pablomarquez@gmail.com",
      },
      items: [
        {
          id: "234892jknadnjkasd",
          price: 300,
          title: "MacBook Pro",
          quantity: 1,
        },
        {
          id: "dkajsdkj8a678asdkjn",
          price: 500,
          title: "iPad",
          quantity: 2,
        },
      ],
      total: 1300,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    setLoading(true);

    orders
      .add(newOrder)
      .then(({ id }) => {
        setOrderId(id); // Sucess
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(items);

  const updateStock = () => {
    setLoading(true);
    const db = getFirestore();

    const itemDoc = db.collection("items").doc("GIXJascc39ztQigVRrtw");

    const actualizarStock = itemDoc.update({
      stock: 17,
      price: 700,
    });
    actualizarStock.then(() => {
      console.log("Document successfully updated!");
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading && <h1>Loading...</h1>}
        {!loading && (
          <ul>
            {items.length &&
              items.map((item) => (
                <>
                  <li>
                    <div>
                      <h4>{item.id}</h4>
                      <h4>{item.data.name}</h4>
                      <p>Price: ${item.data.price}</p>
                    </div>
                  </li>
                </>
              ))}
          </ul>
        )}
        <button onClick={addOrder}>Add Order</button>
        <button onClick={updateStock}>Update Stock</button>
        {orderId && <h2>{orderId}</h2>}
      </header>
    </div>
  );
}

export default App;
