// src/stores/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { user } from '../types/user';
import type { errorMessage } from '../../types/input';

interface UseAuthStore {
    status: string; // Lista de usuarios
    user: user | null; // Indica si la tienda está en estado de carga
    isAuthenticated: boolean,
    haveGroup: boolean,
    errorMessage?: errorMessage; // Mensaje de error, opcional

    // Métodos para manipular el estado
    onChecking: () => void;
    onLogin: (user: user) => void;
    onLogout: (errorMessage: errorMessage) => void;
    clearErrorMessage: () => void;
    initializeAuth: () => void;
    clearSession: () => void;
    clearMessageError: () => void;
}


const useAuthStore = create<UseAuthStore>()(persist(
    (set) => ({
        status: 'checking', // 'checking' / 'authenticated' / 'not-authenticated'
        user: null,
        isAuthenticated: false,
        haveGroup: false,
        errorMessage: undefined,

        // Función para establecer el estado de checking
        onChecking: () => set({ status: 'checking', user: null, isAuthenticated: false, errorMessage: undefined }),

        // Función para manejar login
        onLogin: (user: user) => set({ status: 'authenticated', user, isAuthenticated: true, errorMessage: undefined, haveGroup: user?.grupoDeGastos?.length > 0 }),

        // Función para manejar logout
        onLogout: (errorMessage: errorMessage) => set({ status: 'not-authenticated', user: null, isAuthenticated: false, errorMessage }),

        // Limpiar el mensaje de error
        clearErrorMessage: () => set({ errorMessage: undefined }),

        // Inicializa la autenticación al cargar la página (verifica si el usuario tiene un token)
        initializeAuth: () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Opcional: Agrega lógica para validar el token
                const user = JSON.parse(localStorage.getItem('user') || 'null');
                set({ user, isAuthenticated: true, status: 'authenticated', haveGroup: user?.grupoDeGastos?.length > 0 });
            } else {
                set({ isAuthenticated: false, status: 'not-authenticated' });
            }
        },
        // Función para cerrar sesión
        clearSession: () => {
            localStorage.removeItem('token');
            set({ user: null, isAuthenticated: false, status: 'not-authenticated' });
        },
        clearMessageError: () => {
            set((state: UseAuthStore) => ({ ...state, errorMessage: undefined }));
        },
    }),
    {
        name: 'auth-storage', // Persistencia en localStorage
    }
));

export default useAuthStore;