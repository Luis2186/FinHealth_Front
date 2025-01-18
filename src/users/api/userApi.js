import axiosInstance from "../../api/axiosConfig";

const headers = {
    headers: {
      'Content-Type': 'application/json' // Asegúrate de que este encabezado esté presente
    }
  }

export const register = async (user) => {
    try {
        const response = await axiosInstance.post(`/usuario/registrar`,user) 
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('usuario/login', { email, password });

    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : error.message; 
  }
};

export const logout = async () => {
    try {
      const response = await axiosInstance.post('usuario/logout');
 
      return response; 
    } catch (error) {
      throw error.response ? error.response.data : error.message; 
    }
  };

  export const refreshToken = async (refreshToken) => {
    try {           
        if(!refreshToken) return
        const response = await axiosInstance.post('usuario/refresh-token',refreshToken);
        return response; 
    } catch (error) {
      throw error.response ? error.response.data : error.message; 
    }
  };

// Leer todos los usuarios
export const getUsers = async () => {
    try {
        const response = await axiosInstance.get(`/usuario/paginados`)
        
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
  };

export const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`usuario/obtener/${id}`) 
        console.log(response)
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
  
export const createUser = async (user) => {
    try {
        const response = await axios.axiosInstance.post(`/usuario/registrar`, user)

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const updateUser = async (idUser, updatedUser) => {
    try {
        const response = await axiosInstance.put(`/usuario/actualizar/${idUser}`,updatedUser)
         
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const deleteUser = async (idUser) => {
    try {
        const response = await axiosInstance.delete(`/usuario/eliminar/${idUser}`)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRolesbyUser = async (idUser) => {
    try {
        const response = await axiosInstance.get(`/usuario/obtenerRoles/${idUser}`)

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


export const addRol = async (idUsuario,idRol,nombreRol) => {
    try {
        const agregarRolData= {
            idUsuario,
            idRol,
            nombreRol
        }

        const response = await axiosInstance.post(`/usuario/registrar`,agregarRolData)

        return response.data;

    } catch (error) {          
        throw error.response ? error.response.data : error.message;
    }
};


export const RemoveRol = async (idUsuario,idRol,nombreRol) => {
    try {
        const removerRolData= {
            idUsuario,
            idRol,
            nombreRol
        }
        
        const response = await axiosInstance.post(`/usuario/eliminarRol`,removerRolData)

        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

