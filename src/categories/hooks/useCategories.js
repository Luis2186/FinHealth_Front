import { getAllCategories } from "../api/categoriesApi";
import { useCategorieStore } from "../store/useCategorieStore"



export const useCategories = () => {
    const {onGetAllCategories,onError,onLoading,onCreate,onRemove,onUpdate} = useCategorieStore();

    const handleGetAllCategories = async () => {
        
        const response = await getAllCategories();
        
        if(response.status == 200){

            onGetAllCategories(response.data);
            return response.data
        }

        return response.error
    }

    return {
        handleGetAllCategories,
    }

}