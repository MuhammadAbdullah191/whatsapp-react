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
  },

  updateUser: (id, data) => {
    return axiosInstance.request({
      method: 'Patch',
      url: `/users/${id}/`,
      data: data
    })
  }

};