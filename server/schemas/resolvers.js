const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // User Query
    me: async (parent, args, context) => {
      const getOneUser = await User.findOne({ _id: context.user._id });

      if (!getOneUser) {
        throw new Error("No user found");
      }
      return getOneUser;
    },
  },

  Mutation: {
    // Adding a User Mutation
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // A login Mutation
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    // Save a book mutation
    saveBook: async (parent, args, context) => {
      if (context.user) {
        console.log(args);
        const saveBooks = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: { ...args } } },
          { new: true }
        );
        if (!saveBooks) {
          throw new Error("No book was found");
        }
        return saveBooks;
      }
    },
    // Deleting a book mutation
    deleteBook: async (parent, args, context) => {
      if (context.user) {
        const deleteBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { ...args } } },
          { new: true }
        );

        if (!deleteBook) {
          throw new Error("No book was found");
        }
        return deleteBook;
      }
    },
  },
};

module.exports = resolvers;
