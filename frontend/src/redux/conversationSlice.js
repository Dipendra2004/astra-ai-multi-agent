import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    selectedConversation: null,
  },
  reducers: {
    setConversation: (state, action) => {
      state.conversations = action.payload;
    },

    addConversation: (state, action) => {
      state.conversations.unshift(action.payload);
    },

    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },

    setConvTitle: (state, action) => {
      const { title, conversationId } = action.payload;

      state.conversations = state.conversations.map((conv) =>
        conv._id == conversationId ? { ...conv, title } : conv
      );

      if (state.selectedConversation?._id == conversationId) {
        state.selectedConversation = {
          ...state.selectedConversation,
          title,
        };
      }
    },

    // NEW: Remove a conversation from Redux
    deleteConversation: (state, action) => {
      const conversationId = action.payload;

      state.conversations = state.conversations.filter(
        (conv) => conv._id !== conversationId
      );

      if (state.selectedConversation?._id === conversationId) {
        state.selectedConversation = null;
      }
    },
  },
});

export const {
  setConversation,
  addConversation,
  setSelectedConversation,
  setConvTitle,
  deleteConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
