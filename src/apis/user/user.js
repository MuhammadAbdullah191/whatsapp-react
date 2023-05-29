import axiosInstance from "../config";

export const UserApi = {
  sendOtp: (phone) => {
    return axiosInstance.request({
      method: 'GET',
      url: `/users/new?phone=${phone}`
    });
  },

  verifyOtp: (phone, otp) => {
    return axiosInstance.request({
      method: 'POST',
      url: `/users`,
      data: {
        phone: phone,
        otp: otp
      }
    })
  }

  // getAllMessages: (id) => {
  //   return axiosInstance.request({
  //     method: 'GET',
  //     url: `/rooms/${id}/messages`
  //   });
  // }
};