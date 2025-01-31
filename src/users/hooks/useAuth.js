// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { login,logout, register,getUserById } from '../api/userApi';
import useAuthStore from '../store/useAuthStore';
import useUserStore from '../store/useUserStore';

export const useAuth = () => {
  const { onLogin, onChecking, onLogout, initializeAuth, user, isAuthenticated, errorMessage,clearErrorMessage } = useAuthStore();
  const {onLoading, onRegister} = useUserStore();


  // Función para manejar el login
  const handleLogin = async (email, password) => {
    try {

        // Inicia el estado de autenticación en "checking"
        onChecking();

        // Llama a la API para hacer login
        const response = await login(email, password);
        console.log(response)
        const usuario = await getUserById(response.id);
        
        onLogin(usuario); // Guarda el usuario y el token en el estado global

        window.location.href = "/Categories"; // Redirigir al home después de login

    } catch (err) {
        onLogout(err);
        console.error('Credenciales inválidas', err);
    }
  };

  const handleLogout = async () => {
    try {
        const response = await logout();
        
        onLogout();

        window.location.href = '/LoginPage'; // Redirigir al home después de login

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
       
    }
  };
  

  return {
    user,
    isAuthenticated,
    errorMessage,
    handleLogin,
    handleLogout,
    handleRegister,
    clearErrorMessage,
  };
};