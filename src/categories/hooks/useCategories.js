import { getAllCategories,getCategorieById } from "../api/categoriesApi";
import { useCategorieStore } from "../store/useCategorieStore"



export const useCategories = () => {
    const {onGetAll,onError,onLoading,onCreate,onRemove,onUpdate,setCurrentCategorie,clearCurrentCategorie} = useCategorieStore();

    const handleGetAllCategories = async () => {
        
        onLoading()
        
        const response = await getAllCategories();
        
        if(response.status == 200){

            onGetAll(response.data);
            return response.data
        }

        return response.error
    }

    const handleGetCategorieById = async (id) => {
        onLoading()
        const response = await getCategorieById(id);
        
        if(response.status == 200){
            setCurrentCategorie(response.data);
            return response.data
        }

        return response.error
    }




    return {
        handleGetAllCategories,
        handleGetCategorieById,
    }
}