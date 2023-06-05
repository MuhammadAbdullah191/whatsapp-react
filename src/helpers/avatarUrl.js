export const getAvatarUrl = (contact) => {
  return contact.avatar_url || require('../assets/unknown.jpeg');
};
