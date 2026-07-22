import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export const getProducts = (limit, skip) => {
  return axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
};

export const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};