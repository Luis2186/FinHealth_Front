import type { errorMessage } from "../../types/input";

export interface categorie {
    id: number,
    nombre: string,
    descripcion: string,
    subCategorias: subCategorie[]
}

export interface categorieStore {
    categories: categorie[]; // Lista de usuarios
    loading: boolean; // Indica si la tienda está en estado de carga
    errorMessage?: errorMessage; // Mensaje de error, opcional
    currentCategorie: categorie | undefined

    // Métodos para manipular el estado
    onLoading: () => void;
    onGetAll: (categories: categorie[], errorMessage?: errorMessage) => void;
    onCreate: (categorie: categorie) => void;
    onRemove: (categorieId: number) => void;
    onUpdate: (categorieId: number, updatedCategorie: Partial<categorie>) => void;
    onError: (error: errorMessage) => void;
    setCurrentCategorie: (currentCategorie: categorie) => void;
    clearCurrentCategorie: () => void
}

export interface subCategorieStore {
    subCategories: subCategorie[]; // Lista de usuarios
    loading: boolean; // Indica si la tienda está en estado de carga
    errorMessage?: errorMessage; // Mensaje de error, opcional
    currentSubCategorie: subCategorie | undefined

    // Métodos para manipular el estado
    onLoading: () => void;
    onGetAll: (subCategories: subCategorie[], errorMessage?: errorMessage) => void;
    onCreate: (subCategorie: subCategorie) => void;
    onRemove: (subCategorieId: number) => void;
    onUpdate: (subCategorieId: number, updatedUser: Partial<subCategorie>) => void;
    onError: (error: errorMessage) => void;
    setCurrentSubCategorie: (currentSubCategorie: subCategorie) => void;
    clearCurrentSubCategorie: () => void
}

export interface subCategorie {
    id: number,
    nombre: string,
    descripcion: string,
    categoriaId: number,
    familiaId: number
}