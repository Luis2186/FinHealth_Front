const API_URL = import.meta.env.PUBLIC_API_URL;

// Leer todos los usuarios
export const getUsers = async () => {
    try {
        // Obtener el token de localStorage (o de donde lo guardes)
        const token = localStorage.getItem("token"); 

        if (!token) {
            throw new Error("No se encontró un token de autenticación.");
        }

        const response = await fetch(`${API_URL}/usuario/paginados`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
            }
        });
       
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData; 
        }
        
        return await response.json();
    } catch (error) {
        console.error(error);
      throw error;
    }
  };
    
export const register = async (user) => {
    try {
        const response = await fetch(`${API_URL}/usuario/registrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
           
        },
        body: JSON.stringify(user),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData; 
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const login = async (email,password) => {
    try {
        const loginData = {
            email: email,
            password: password
            };
        
        const response = await fetch(`${API_URL}/usuario/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData; 
        }

        return await response.json();
    } catch (error) {     
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/usuario/obtener/${id}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData; 
        }

        return await response.json();

    } catch (error) {
        throw error;
    }
};
  
export const createUser = async (user) => {
    try {
        const response = await fetch(`${API_URL}/usuario/registrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        });

        if (!response.ok) {
        const errorData = await response.json();
        throw errorData; 
    }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateUser = async (idUser, updatedUser) => {
    try {
        const response = await fetch(`${API_URL}/actualizar/${idUser}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData; 
        }
        
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
  

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData; 
        }

        return id;

    } catch (error) {
        throw error;
    }
};

export const getRolesbyUser = async (idUser) => {
    try {
        const response = await fetch(`${API_URL}/usuario/obtenerRoles/${idUser}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData; 
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const addRol = async (idUsuario,idRol,nombreRol) => {
    try {
        const agregarRolData= {
            idUsuario,
            idRol,
            nombreRol
        }

        const response = await fetch(`${API_URL}/usuario/registrar`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(agregarRolData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData; 
        }

        return await response.json();

    } catch (error) {          
        throw error;
    }
};


export const RemoveRol = async (idUsuario,idRol,nombreRol) => {
    try {
        const agregarRolData= {
            idUsuario,
            idRol,
            nombreRol
        }

        const response = await fetch(`${API_URL}/usuario/eliminarRol`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(agregarRolData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData; 
        }

        return await response.json();

    } catch (error) {
        throw error;
    }
};