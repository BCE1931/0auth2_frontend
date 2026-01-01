import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

const DELETE_PROD = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      msg
      code
    }
  }
`;

const Intro = () => {
  const [num, setnum] = useState("");
  const [deleteProduct, { data, error, loading }] = useMutation(DELETE_PROD);

  const handledeleteproduct = () => {
    deleteProduct({
      variables: {
        id: 15,
      },
    });
  };

  if (loading) return <p>Updating...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data ? (
        <div>
          <p>{data.deleteProduct.code}</p>
        </div>
      ) : (
        <div>
          <input
            type="number"
            placeholder="enter id"
            onChange={(e) => setnum(e.target.value)}
            value={num}
          ></input>
          <button type="submit" onClick={handledeleteproduct}>
            submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Intro;
