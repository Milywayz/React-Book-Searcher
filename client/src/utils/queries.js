import { gql } from "@apollo/client";

// User Query
export const GET_USER = gql`
  query Query {
    me {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
