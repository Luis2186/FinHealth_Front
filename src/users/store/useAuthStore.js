// src/stores/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const apiUrl = import.meta.env.PUBLIC_API_URL;

const useAuthStore = create(persist(
  (set) => ({
    status: 'checking', // 'checking' / 'authenticated' / 'not-authenticated'
    user: null,
    isAuthenticated: false,
    errorMessage: undefined,

    // Función para establecer el estado de checking
    onChecking: () => set({ status: 'checking', user: null, isAuthenticated: false, errorMessage: undefined }),

    // Función para manejar login
    onLogin: (user) => set({ status: 'authenticated', user, isAuthenticated: true, errorMessage: undefined }),

    // Función para manejar logout
    onLogout: (errorMessage) => set({ status: 'not-authenticated', user: null, isAuthenticated: false, errorMessage }),

    // Limpiar el mensaje de error
    clearErrorMessage: () => set({ errorMessage: undefined }),

    // Inicializa la autenticación al cargar la página (verifica si el usuario tiene un token)
    initializeAuth: () => {
      const token = localStorage.getItem('token');
      if (token) {
        set({ token, isAuthenticated: true, status: 'authenticated' });
      } else {
        set({ isAuthenticated: false, status: 'not-authenticated' });
      }
    },

    // Función para cerrar sesión
    clearSession: () => {
      localStorage.removeItem('token');
      set({user: null, isAuthenticated: false, status: 'not-authenticated' });
    },
  }),
  {
    name: 'auth-storage', // Persistencia en localStorage
  }
));

export default useAuthStore;