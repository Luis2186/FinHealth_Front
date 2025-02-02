import { getAllSubCategories } from '../api/subCategoriesApi'
import { useSubCategorieStore } from '../store/useSubCategorieStore'

export const useSubCategories = () => {

    const {onLoading, onGetAll, onCreate, onRemove, onUpdate, onError, setCurrentSubCategorie , clearCurrentSubCategorie} = useSubCategorieStore()

    const handleGetAllSubCategories = async (familyId, categorieId) => {
        
            if(!familyId || !categorieId) return
        
            const request= {
                familiaId:familyId,
                categoriaId: categorieId
            }

            onLoading()
            
            const response = await getAllSubCategories(familyId,categorieId );
            
            if(response.status == 200){
    
                onGetAll(response.data);
                return response.data
            }
    
            return response.error
        }


    return {
        handleGetAllSubCategories,
    }
}