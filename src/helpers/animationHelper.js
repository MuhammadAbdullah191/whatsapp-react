export const scrollHelper = () => {
  const chatMessagesContainer = document.querySelector("#scrollableDiv");
	chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
};
