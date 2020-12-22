import React, { useEffect, useState } from "react";
import { getFirestore } from "./firebase/index";

export default function Item({ id }) {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();

    const itemCollection = db.collection("items");
    const item = itemCollection.doc(id);

    item
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("Items does not exist!");
          return;
        }
        console.log("Item found!");
        debugger;
        setItem({
          id: doc.id,
          ...doc.data(),
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <div>
      {loading && <h1>Loading Items...</h1>}
      {!loading && (
        <>
          <h2>{item.name}</h2>
          <p>Price: {item.price}</p>
          <p>Stock: {item.stock}</p>
        </>
      )}
    </div>
  );
}
