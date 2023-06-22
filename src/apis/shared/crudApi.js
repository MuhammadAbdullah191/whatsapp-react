import axiosInstance from "../config";

export const CrudApi = {
  getAll: (model, query) => {
    return axiosInstance.request({
      method: 'GET',
      url: `/${model}${query ? `?query=${query}` : ''}`
    });
  },

  getRecord: (model, id) => {
    return axiosInstance.request({
      method: 'GET',
      url: `/${model}/${id}`
    });
  },

  postRecord: (model, body) => {
    return axiosInstance.request({
      method: 'POST',
      url: `/${model}`,
      data: body
    });
  },

  editRecord: (model, id, body) => {
    return axiosInstance.request({
      method: 'PATCH',
      url: `/${model}/${id}`,
      data: body
    });
  },

  deleteRecord: (model, id) => {
    return axiosInstance.request({
      method: 'DELETE',
      url: `/${model}/${id}`
    });
  }

};
