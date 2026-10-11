import api from "../../utils/axios.js";

export const deleteConversation = async (conversationId) => {
  const { data } = await api.delete(
    `/api/chat/delete-conversation/${conversationId}`
  );

  return data;
};
