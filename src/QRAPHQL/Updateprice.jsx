import React, { useRef } from "react";
import { gql } from "@apollo/client";
import { useMutation, useLazyQuery } from "@apollo/client/react";
import { useState, useEffect } from "react";

const UPDATE_PRICE = gql`
  mutation UpdatePrice($id: ID!, $price: Int!) {
    updatePrice(id: $id, price: $price) {
      id
      name
      quantity
      price
    }
  }
`;

const FIND_BY_ID = gql`
  query FindById($id: ID!) {
    findById(id: $id) {
      id
      name
      quantity
      price
    }
  }
`;

const Updateprice = () => {
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState(null);

  const [findById, { data, loading: findLoading, error: findError }] =
    useLazyQuery(FIND_BY_ID, { fetchPolicy: "network-only" });

  const [updatePrice, { loading, error }] = useMutation(UPDATE_PRICE);

  useEffect(() => {
    if (data?.findById) {
      console.log("GRAPHQL DATA:", data.findById);
      setProduct(data.findById);
      setPrice(data.findById.price);
    }
  }, [data]);

  const handleFind = () => {
    if (!id) return;
    findById({ variables: { id: Number(id) } });
  };

  const handleUpdate = () => {
    updatePrice({
      variables: {
        id: product.id,
        price: Number(price),
      },
    });
  };

  if (findLoading || loading) return <p>Loading...</p>;
  if (findError) return <p>Error: {findError.message}</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter ID"
      />
      <button onClick={handleFind}>Find Product</button>

      {product && (
        <div>
          <input value={product.id} disabled />
          <input value={product.name} disabled />
          <input value={product.quantity} disabled />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleUpdate}>Update Price</button>
        </div>
      )}
    </div>
  );
};

export default Updateprice;
