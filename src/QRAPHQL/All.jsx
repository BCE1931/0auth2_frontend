import React from "react";
import { gql } from "@apollo/client";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client/react";

const FIND_ALL_PRODUCTS = gql`
  query FindAllProducts {
    findAll {
      id
      name
      price
      quantity
    }
  }
`;

const All = () => {
  const { data, loading, error } = useQuery(FIND_ALL_PRODUCTS, {
    fetchPolicy: "network-only", // 🔥 avoids GraphQL cache issues
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Products</h2>

      {data.findAll.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <p>
            <b>ID:</b> {product.id}
          </p>
          <p>
            <b>Name:</b> {product.name}
          </p>
          <p>
            <b>Price:</b> {product.price}
          </p>
          <p>
            <b>Quantity:</b> {product.quantity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default All;
