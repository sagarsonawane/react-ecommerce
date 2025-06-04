import axiosInstance from "./axiosInstance";

export const fetchProducts = () =>
    axiosInstance.get("/products").then((response) => response.data);

export const fetchProductById = (id) =>
    axiosInstance.get(`/products/${id}`).then((response) => response.data);