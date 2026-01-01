import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useRef } from "react";
import React from "react";

const Add = () => {
  const CREATE_PROD = gql`
    mutation CreateProduct(
      $name: String!
      $category: String!
      $quantity: Int!
      $price: Int!
    ) {
      addProduct(
        name: $name
        category: $category
        quantity: $quantity
        price: $price
      ) {
        id
        name
        category
        quantity
        price
      }
    }
  `;
  const [addProduct, { data, error, loading }] = useMutation(CREATE_PROD);

  const name = useRef(null);
  const category = useRef(null);
  const quantity = useRef(null);
  const price = useRef(null);
  const handleadd = (e) => {
    e.preventDefault();
    addProduct({
      variables: {
        name: name.current.value,
        category: category.current.value,
        quantity: parseInt(quantity.current.value),
        price: parseInt(price.current.value),
      },
    });
  };
  if (loading) return <p>Updating...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <p>hey this add page</p>
      <form onSubmit={handleadd}>
        <input type="text" placeholder="enter product name" ref={name}></input>
        <input
          type="text"
          placeholder="enter category name"
          ref={category}
        ></input>
        <input
          type="number"
          placeholder="enter quantity"
          ref={quantity}
        ></input>
        <input type="number" placeholder="enter price" ref={price}></input>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default Add;
