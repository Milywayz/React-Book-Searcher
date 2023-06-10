import { gql } from "@apollo/client";

// Login Mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Add User Mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Save Book Mutation
export const SAVE_BOOK = gql`
  mutation saveBook(
    $description: String!
    $bookId: String!
    $title: String!
    $image: String
    $authors: [String]
  ) {
    saveBook(
      description: $description
      bookId: $bookId
      title: $title
      image: $image
      authors: $authors
    ) {
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

// Delete Book Mutation
export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
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
