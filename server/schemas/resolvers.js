const { AuthenticationError } = require("apollo-server-express");
const { User, Chat, Room } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, args) => {
      return User.find({});
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    room: async (parent, args) => {
      return Room.find({});
    },
    chat: async (parent, args) => {
      return Chat.find({});
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

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
    addRoom: async (parent, args, context) => {
      if (context.user) {
        const room = await Room.create({
          ...args,
          username: context.user.username,
        });
        return room;
      }

      throw new AuthenticationError("Not logged in");
    },

    addChat: async (parent, args, context) => {
      if (context.user) {
        const chat = await Chat.create({
          ...args,
          username: context.user.username,
        });
        console.log(chat);
        const room = await Room.findByIdAndUpdate(
          { _id: args.roomId },
          { $push: { roomChat: chat._id } },
          { new: true }
        ).populate("roomChat");
        return room;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
