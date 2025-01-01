import { create } from 'zustand'
import type { errorMessage } from '../../types/input';

interface categorie {
    id: number,
    nombre: string,
    descripcion: string
}

interface categorieStore {
    categories: categorie[]; // Lista de usuarios
    loading: boolean; // Indica si la tienda está en estado de carga
    errorMessage?: errorMessage; // Mensaje de error, opcional

    // Métodos para manipular el estado
    onLoading: () => void;
    onGetAllCategories: (categories: categorie[], errorMessage?: errorMessage) => void;
    onCreate: (categorie: categorie) => void;
    onRemove: (categorieId: number) => void;
    onUpdate: (categorieId: number, updatedUser: Partial<categorie>) => void;
    onError: (error: errorMessage) => void;
}


const useCategorieStore = create<categorieStore>((set) => ({
    categories: [],
    loading: false,
    errorMessage: undefined,

    onLoading: () => {
        set((state) => ({ ...state, loading: true }))
    },
    onGetAllCategories: (categories, errorMessage) => {
        set((state) => ({ categories, loading: false, errorMessage }))
    },
    onCreate: (categorie) => {
        set((state) => ({ ...state, loading: false, categories: [...state.categories, categorie] }))
    },
    onRemove: (categorieId) => {
        set((state) =>
        ({
            loading: false,
            categories: state.categories.filter(categorie => categorie.id !== categorieId)
        })
        )
    },
    onUpdate: (categorieId, updateCategorie) => {
        set((state) => ({
            loading: false,
            categories: state.categories.map((categorie) =>
                categorie.id === categorieId ? { ...categorie, ...updateCategorie } : categorie
            ),
        }))
    },
    onError: (errorMessage) => {
        set((state) => ({ ...state, errorMessage }))
    }
}))