export const getMessageClass = (message, currentUser) => {
  const isCurrentUser = message.user_id === currentUser.id;
  return isCurrentUser ? "sender-msg" : "receiver-msg";
};

export const isMessageFromCurrentUser = (message, currentUser) => {
  return message.user_id === currentUser.id;
};

