import axios from 'axios';

// Crea una instancia de axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL, // Utiliza tu variable de entorno para la URL base
  timeout: 5000,  // Tiempo de espera de 5 segundos (puedes ajustarlo según lo necesites)
});

// Interceptor para agregar el token de autenticación a todas las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;