import axiosInstance from "../config";

export const AuthApi = {
  verifyUser: () => {
    return axiosInstance.request({
      method: 'get',
      url: `/users/verify_user`,
    });
  }
}
