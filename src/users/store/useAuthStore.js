// src/stores/useAuthStore.js
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';  // Asegúrate de importar axios
import { login } from '../api/userApi';

const apiUrl = import.meta.env.PUBLIC_API_URL;

const useAuthStore = create(persist(
  (set) => ({
    userId: null,
    token: null,
    isAuthenticated: false,
    
    // Función para establecer el usuario
    setUser: (userId, token) => {
      set({ userId, token, isAuthenticated: true });
    },
    
    //login
    login: async (email,password) => {      
        try {
            const response= await login(email,password);
            console.log(response)
          } catch (error) {
            console.log("Error: " + error )
            set({ error: error.message });
          }
    },

    // Función para cerrar sesión
    logout: () => {
      set({ userId: null, token: null, isAuthenticated: false });
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
    },

    // Función para recuperar el usuario desde el localStorage
    initializeAuth: () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (userId && token) {
        set({ userId, token, isAuthenticated: true });
      }
    },
  }),
  {
    name: 'auth-storage', // Persistencia en localStorage
  }
));

export default useAuthStore;