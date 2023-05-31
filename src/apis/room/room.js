import axiosInstance from "../config";
export const RoomApi = {
  getCurrentRoom: (id1,id2) => {
    return axiosInstance.request({
      method: 'GET',
      url: `/rooms/find_by_user_ids?user1_id=${id1}&user2_id=${id2}`
    });
  },
  getAllMessages: (id, per_page) => {
    return axiosInstance.request({
      method: 'GET',
      url: `/rooms/${id}/messages?per_page=${per_page}`
    });
  },
  sendMessage: (room_id, content, user_id) => {
    return axiosInstance.request({
      method: 'Post',
      url: `/rooms/${room_id}/messages`,
      data: {
        content: content,
        user_id: user_id
      }
    });
  }
};