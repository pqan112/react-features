import { chatModel } from "../models/chatModel.js";

const chatController = {
  // create chat
  createChat: async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
      const chat = await chatModel.findOne({
        members: { $all: [firstId, secondId] },
      });

      if (chat) return res.status(200).json(chat);

      const newChat = new chatModel({
        members: [firstId, secondId],
      });

      const response = await newChat.save();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // get user chats
  findUserChats: async (req, res) => {
    const userId = req.params.userId;

    try {
      const chats = await chatModel.find({ members: { $in: [userId] } });
      console.log(chats);
      res.status(200).json(chats);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // find chat
  findChat: async (req, res) => {
    const { firstId, secondId } = req.params;
    try {
      const chat = await chatModel.find({
        members: { $all: [firstId, secondId] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default chatController;
