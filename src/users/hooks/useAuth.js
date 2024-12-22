// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { login, register,getUserById } from '../api/userApi';
import useAuthStore from '../store/useAuthStore';
import useUserStore from '../store/useUserStore';

export const useAuth = () => {
  const { onLogin, onChecking, onLogout, initializeAuth, user, isAuthenticated, errorMessage,clearErrorMessage } = useAuthStore();
  const {onLoading, onRegister} = useUserStore();

  const [loading, setLoading] = useState(false);

  // Verificamos el estado de autenticacion en el localstorage
  useEffect(() => {
    initializeAuth(); // Verifica si hay un token en localStorage
  }, []);

  // Función para manejar el login
  const handleLogin = async (email, password) => {
    try {

        if (isAuthenticated) return; // Si ya está autenticado, retornamos

        // Inicia el estado de autenticación en "checking"
        onChecking();

        // Llama a la API para hacer login
        const response = await login(email, password);

        const usuario = await getUserById(response.id);
        
        onLogin(usuario); // Guarda el usuario y el token en el estado global

        // Guarda el token en el localStorage
        localStorage.setItem('token', response.token);

        window.location.href = '/'; // Redirigir al home después de login

    } catch (err) {
        onLogout(err);
        console.error('Credenciales inválidas', err);
    }
  };

  // Función para manejar el registro
  const handleRegister = async (user) => {
    try {
        onLoading()

        const response = await register(user);
        console.log(response)
        onLogin(user);
        onRegister(user)
        
        localStorage.setItem('token', response.token); // Guarda el token en el localStorage

        //window.location.href = '/'; // Redirigir al home después de registro

    } catch (err) {
        onLogout(err);

    } finally {
        setLoading(false);
    }
  };
  

  return {
    user,
    isAuthenticated,
    errorMessage,
    handleLogin,
    handleRegister,
    clearErrorMessage,
    loading,
  };
};