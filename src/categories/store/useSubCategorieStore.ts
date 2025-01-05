import { create } from 'zustand'
import type { subCategorieStore, subCategorie } from '../types/categoriesTypes';


export const useCategorieStore = create<subCategorieStore>((set) => ({
    subCategories: [],
    loading: false,
    errorMessage: undefined,
    currentSubCategorie: undefined,

    onLoading: () => {
        set((state) => ({ ...state, loading: true }))
    },
    onGetAll: (subCategories, errorMessage) => {
        set((state) => ({ subCategories, loading: false, errorMessage }))
    },
    onCreate: (subCategorie) => {
        set((state) => ({ ...state, loading: false, subCategories: [...state.subCategories, subCategorie] }))
    },
    onRemove: (subCategorieId) => {
        set((state) =>
        ({
            loading: false,
            subCategories: state.subCategories.filter(subCategorie => subCategorie.id !== subCategorieId)
        })
        )
    },
    onUpdate: (subCategorieId, updateSubCategorie) => {
        set((state) => ({
            loading: false,
            subCategories: state.subCategories.map((subCategorie) =>
                subCategorie.id === subCategorieId ? { ...subCategorie, ...updateSubCategorie } : subCategorie
            ),
        }))
    },
    onError: (errorMessage) => {
        set((state) => ({ ...state, errorMessage }))
    },
    setCurrentSubCategorie: (currentSubCategorie: subCategorie) => {
        set((state) => ({ ...state, loading: false, currentSubCategorie }))
    },
    clearCurrentSubCategorie: () => {
        set((state) => ({ ...state, currentSubCategorie: undefined }))
    }
}))