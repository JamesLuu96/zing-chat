const { AuthenticationError } = require("apollo-server-express");
const { User, Chat, Room } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

//   Mutation: {
//     addRoom: async (parent, args) => {
//       const room = await Room.create(args);
//       return room;
//     },

//     addChat: async (parent, args, context) => {
    
//       if (context.user) {
//         await User.findByIdAndUpdate(context.user._id, {
//           $push: { chat: message },
//         });

//         return ;
//       }

//       throw new AuthenticationError("Not logged in");
//     },
//   },
};

module.exports = resolvers;
