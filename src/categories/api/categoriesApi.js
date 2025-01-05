import axiosInstance from "../../api/axiosConfig";

const endpoint= "/categoria"

export const getAllCategories = () => {
    try {
        const response = axiosInstance.get(`${endpoint}/todas`)
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

export const getCategorieById = (id) => {
    try {
        const response = axiosInstance.get(`${endpoint}/obtener/${id}`)
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}