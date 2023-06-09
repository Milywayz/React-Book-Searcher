import { gql } from "@apollo/client";

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
