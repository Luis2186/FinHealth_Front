import { create } from 'zustand';
import type { user } from '../types/user';
import type { errorMessage } from '../../types/input';

interface UserStoreState {
    users: user[]; // Lista de usuarios
    loading: boolean; // Indica si la tienda está en estado de carga
    errorMessage?: errorMessage; // Mensaje de error, opcional

    // Métodos para manipular el estado
    onLoading: () => void;
    onGetAllUsers: (users: user[], errorMessage?: errorMessage) => void;
    onRegister: (user: user) => void;
    onRemoveUser: (userId: string) => void;
    onUpdateUser: (userId: string, updatedUser: Partial<user>) => void;
    onAddRolUser: (userId: string, rol: string) => void;
    onRemoveRolUser: (userId: string, rol: string) => void;
    onError: (error: errorMessage) => void;
}

const useUserStore = create<UserStoreState>((set) => ({
    users: [],
    loading: false,
    errorMessage: undefined,

    onLoading: () => {
        set((state) => ({ ...state, loading: true, errorMessage: undefined }));
    },
    // Función para obtener usuarios desde la API
    onGetAllUsers: (users, errorMessage) => {
        set({ users, loading: false, errorMessage });
    },
    // Función para agregar un usuario
    onRegister: (user) => {
        set((state) => ({ ...state, isLoading: false, users: [...state.users, user] }));
    },

    // Función para eliminar un usuario
    onRemoveUser: (userId) => {
        set((state) => ({
            users: state.users.filter((user) => user.id !== userId),
        }));
    },
    // Función para actualizar un usuario
    onUpdateUser: (userId, updatedUser) => {
        set((state) => ({
            loading: false,
            users: state.users.map((user) =>
                user.id === userId ? { ...user, ...updatedUser } : user
            ),
        }));
    },
    onError: (error) => {
        set((state) => ({
            ...state,
            errorMessage: error
        }))
    },
    // Función para agregar rol a un usuario
    onAddRolUser: (userId, rol) => {
        set((state) => ({
            loading: false,
            users: state.users.map((user) =>
                user.id === userId
                    ? {
                        ...user,
                        roles: [...new Set([...user.roles, rol])] // Set para eliminar duplicados automáticamente
                    }
                    : user
            ),
        }));
    },
    // Función para eliminar rol a un usuario
    onRemoveRolUser: (userId, rol) => {
        set((state) => ({
            loading: false,
            users: state.users.map((user) =>
                user.id === userId
                    ? {
                        ...user,
                        roles: user.roles.filter((r) => r !== rol), // Elimina el rol de la lista
                    }
                    : user
            ),
        }));
    },

}));

export default useUserStore;