const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      const getOneUser = await User.findOne({ _id: context.user._id });

      if (!getOneUser) {
        throw new Error("No user found");
      }
      return getOneUser;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

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
