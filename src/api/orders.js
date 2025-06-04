    import axiosInstance from "./axiosInstance"
    export const submitOrder = (orderData) => {
        return axiosInstance.post("/orders", orderData).then((response) => {
            return response.data;
        });
    } 
