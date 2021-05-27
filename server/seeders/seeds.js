const db = require("../config/connection");
const { User, Chat, Room } = require("../models");

db.once("open", async () => {
  await User.deleteMany();
  await User.create({
    username: "admin",
    password: "admin",
  });
  await User.create({
    username: "test",
    password: "test",
  });

  await Chat.deleteMany();

  await Chat.create({
    message: "hello",
    username: User[0]._id,
  });
  await Chat.create({
    message: "holla",
    username: User[1]._id,
  });

  await Room.deleteMany();
  await Room.create({
    roomName: "tiny",
    username: User[0]._id,
  });
  await Room.create({
    roomName: "dark",
    username: User[1]._id,
  });

  console.log("rooms seeded");

  process.exit();
});
