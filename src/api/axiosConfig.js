import axios from 'axios';

// Crea una instancia de axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL, // Utiliza tu variable de entorno para la URL base
  //timeout: 10000,  // Tiempo de espera de 5 segundos (puedes ajustarlo según lo necesites)
  withCredentials : true,
  headers: {
    'Content-Type': 'application/json', // Establece el tipo de contenido por defecto
  }
});



// Interceptor para agregar el token de autenticación a todas las solicitudes
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         // Maneja errores de autenticación, por ejemplo, redirigiendo al login
//         window.location.href = '/LoginPage';
//       }
//       return Promise.reject(error);
//     }
//   );

export default axiosInstance;