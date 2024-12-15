const API_URL = import.meta.env.PUBLIC_API_URL;


// Leer todos los usuarios
export const getUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/usuario/paginados`);
      if (!response.ok) throw new Error("Error obteniendo usuarios");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
    
 // Leer un solo usuario por ID
 export const register = async (user) => {
    try {
        const response = await fetch(`${API_URL}/usuario/registrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        });
       
    //   if (!response.ok) throw new Error("Error fetching user");
    
    if (!response.ok) {
        // Si la respuesta no es exitosa, leemos el cuerpo para obtener detalles del error
        const errorResponse = await response.json();
        //throw new Error(errorResponse);
        return errorResponse;
        //throw new Error(errorResponse.error || "Error al registrar usuario: " + (errorResponse.detalles || "Detalles no disponibles"));
    }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Leer un solo usuario por ID
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

      if (!response.ok) throw new Error("Error fetching user");

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Leer un solo usuario por ID
  export const getUserById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/usuario/obtener/${id}`);

      if (!response.ok) throw new Error("Error fetching user");

      return await response.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Crear un nuevo usuario
  export const createUser = async (user) => {
    try {
      const response = await fetch(`${API_URL}/usuario/registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Error creating user");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Actualizar un usuario
  export const updateUser = async (idUser, updatedUser) => {
    try {
      const response = await fetch(`${API_URL}/actualizar/${idUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Error updating user");
      
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Eliminar un usuario
  export const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting user");
      return id; // Devuelve el ID del usuario eliminado
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


    // Leer todos los usuarios
    export const getRolesbyUser = async (idUser) => {
        try {
            const response = await fetch(`${API_URL}/usuario/obtenerRoles/${idUser}`);

            if (!response.ok) throw new Error("Error obteniendo usuarios");

            return await response.json();

        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Crear un nuevo Rol 
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

          if (!response.ok) throw new Error("Error creating user");

          return await response.json();

        } catch (error) {
          console.error(error);
          throw error;
        }
      };

       // Crear un nuevo Rol 
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

          if (!response.ok) throw new Error("Error creating user");

          return await response.json();

        } catch (error) {
          console.error(error);
          throw error;
        }
      };