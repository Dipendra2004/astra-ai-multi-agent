import { request } from "express"
import Conversation from "../models/conversations.model.js"
import Message from "../models/message.model.js"

export const createConversation = async (req,res) => {
    try {
        const userId = req.headers["x-user-id"]
        console.log("userId",userId)
        const conversation = await Conversation.create({
            userId:userId
        })

        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:`create conversation error ${error}`})
    }
}

export const getConversations = async (req,res) => {
    try {
        const userId = req.headers["x-user-id"]
        console.log("userId",userId)
        const conversations = await Conversation.find({
            userId:userId
        }) .sort({updatedAt:-1})

        return res.status(200).json(conversations)
    } catch (error) {
        return res.status(500).json({message:`get conversation error ${error}`})
    }
}

export const updateConversation = async (req,res) => {
    try {
        const {id, title} = req.body
        const conversation = await Conversation.findByIdAndUpdate(id,{
            title
        })

        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:`update conversation error ${error}`})
    }
}


export const saveMessage = async (req,res) => {
    try {
        const {conversationId,role,content,images,artifacts} = req.body
        const message = await Message.create({
            conversationId,
            content,
            role,
            images,
            artifacts
        }) 
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({message:`save message error ${error}`})
    }
}

export const getMessages = async (req,res) => {
    try {
        
        const messages = await Message.find({
            conversationId:req.params.conversationId
        })
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json({message:`get messages error ${error}`})
    }
}


export const deleteConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { conversationId } = req.params;

    // Find the conversation belonging to this user
    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    // Delete all messages associated with this conversation
    await Message.deleteMany({ conversationId });

    // Delete the conversation itself
    await Conversation.deleteOne({
      _id: conversationId,
      userId,
    });

    return res.status(200).json({
      message: "Conversation deleted successfully",
      conversationId,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Delete conversation error: ${error.message}`,
    });
  }
};




