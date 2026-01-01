import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql",
});

const authLink = new SetContextLink((prevContext, operation) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

// ---------------------------------------------------------------------------
// CREATION
// const CREATE_PROD = gql`
//   mutation CreateProduct(
//     $name: String!
//     $category: String!
//     $quantity: Int!
//     $price: Int!
//   ) {
//     addProduct(
//       name: $name
//       category: $category
//       quantity: $quantity
//       price: $price
//     ) {
//       id
//       name
//       category
//       quantity
//       price
//     }
//   }
// `;

// const [addProduct, { data, error, loading }] = useMutation(CREATE_PROD);

//   const handleaddproduct = () => {
//     addProduct({
//       variables: {
//         name: "washing machine",
//         category: "Electrical",
//         quantity: 4556,
//         price: 45678,
//       },
//     });
//   };

// -----------------------------------------------------------------------------
// READING
// const FIND_ALL_PRODUCTS = gql`
//   query {
//     findAll {
//       id
//       name
//       category
//       quantity
//       price
//     }
//   }
// `;

// const FIND_BY_CATEGORY = gql`
//   query {
//     findByCategory(category: "Laptop") {
//       id
//       name
//       category
//       quantity
//       price
//     }
//   }
// `;

// const {data , loding ,error} = useQuery(FIND_ALL_PRODUCTS)

// --------------------------------------------------------------------------
// UPDATTION

// const UPDATE_PRICE = gql`
//   mutation ($id: ID!, $price: Int!) {
//     updatePrice(id: $id, price: $price) {
//       id
//       name
//       quantity
//       price
//     }
//   }
// `;

// const [updatePrice, { data, loading, error }] = useMutation(UPDATE_PRICE);
//   console.log(data);

//   const handlePriceUpdate = () => {
//     updatePrice({
//       variables: {
//         id: 1,
//         price: 7000,
//       },
//     });
//   };

// ---------------------------------------------------------------------
// DLETEION
// const DELETE_PROD = gql`
//   mutation DeleteProduct($id: ID!) {
//     deleteProduct(id: $id) {
//       id
//       name
//       category
//       price
//       quantity
//     }
//   }
// `;

//   const [deleteProduct, { data, error, loading }] = useMutation(DELETE_PROD);

//   const handledeleteproduct = () => {
//     deleteProduct({
//       variables: {
//         id: 14,
//       },
//     });
//   };
