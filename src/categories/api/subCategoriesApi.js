import axiosInstance from "../../api/axiosConfig";

const endpoint= "/subcategoria"

export const getAllSubCategories = async (familyId,categorieId) => {
    try {
        console.log(familyId,categorieId)
        const response = await axiosInstance.get(`${endpoint}/todas/${familyId}/${categorieId}`)
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

export const getSubCategorieById = async (id) => {
    try {
        const response = await axiosInstance.get(`${endpoint}/obtener/${id}`) 
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
  
export const createSubCategorie = async (createdSubCategorie) => {
    try {
        const response = await axios.axiosInstance.post(`${endpoint}/crear`, createdSubCategorie)

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const updateSubCategorie = async (id, updatedSubCategorie) => {
    try {
        const response = await axiosInstance.put(`${endpoint}/actualizar/${id}`,updatedSubCategorie)
         
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const deleteSubCategorie = async (id) => {
    try {
        const response = await axiosInstance.delete(`${endpoint}/eliminar/${id}`)
        return response.data;
    } catch (error) {
        throw error;
    }
};