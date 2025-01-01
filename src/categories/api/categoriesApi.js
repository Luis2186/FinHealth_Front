import axiosInstance from "../../api/axiosConfig";

export const getAllCategories = () => {
    try {
        const response = axiosInstance.get('/categoria/todas')
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}