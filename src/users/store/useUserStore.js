// src/stores/useUserStore.js
import {create} from 'zustand';
import axios from 'axios';

const apiUrl = import.meta.env.PUBLIC_API_URL;

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  // Función para obtener usuarios desde la API
  fetchUsers: async () => {
    set({ loading: true, error: null });  // Establecemos loading a true
    try {
        const apiUrl = import.meta.env.PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/usuario/paginados`);
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Función para agregar un usuario
  addUser: async (user) => {
    try {
      await axios.post('https://api.example.com/users', user);
      set((state) => ({ users: [...state.users, user] }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Función para eliminar un usuario
  removeUser: async (userId) => {
    try {
      await axios.delete(`https://api.example.com/users/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Función para actualizar un usuario
  updateUser: async (userId, updatedUser) => {
    try {
      await axios.put(`https://api.example.com/users/${userId}`, updatedUser);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, ...updatedUser } : user
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useUserStore;