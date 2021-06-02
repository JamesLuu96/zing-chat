const { AuthenticationError } = require("apollo-server-express");
const { User, Chat, Room } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, {}) => {
      return User.find({});
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("friends");

        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    rooms: async (parent, args) => {
      return Room.find({}).populate("roomChat");
    },

    room: async (parent, args) => {
      return Room.find({ _id: args._id }).populate("roomChat");
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
        console.log(room);
        return room;
      }

      throw new AuthenticationError("Not logged in");
    },

    updateRoom: async (parent, args, context) => {
      console.log(args);
      if (context.user) {
        const room = await Room.findOneAndUpdate(
          { _id: args.roomId },
          {
            $set: {
              colors: args.colors,
              tags: args.tags,
              roomName: args.roomName,
              privacy: args.privacy,
            },
          },
          { new: true, runValidators: true }
        );

        return room;
      }
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
    deleteChat: async (parent, args, context) => {
      const room = await Chat.findOneAndDelete({ _id: args.chatId });
      return room;
    },

    deleteRoom: async (parent, args, context) => {
      console.log(args, "args");
      if (context.user) {
        const room = await Room.findByIdAndDelete({ _id: args._id });
        console.log(room, "room");
        return room;
      }
    },

    addFriend: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          context.user._id,
          {
            $addToSet: { friends: args.friendId },
          },
          { new: true }
        ).populate("friends");

        return user;
      }
    },
  },
};

module.exports = resolvers;
