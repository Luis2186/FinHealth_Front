import jwt from 'jsonwebtoken';  

export const formatDate = (dateString) => {
    const [ month, day, year] = dateString.split("/"); // Dividir por "/"

    return `${year}-${month}-${day}`; // Reordenar en formato "aaaa-mm-dd"
  };

  export const verifyAuth = async (token) => {
    if (!token) {
      return {
        status: "unauthorized",
        msg: "Please pass a request token",
      };
    }
  
    try {
      // La clave secreta que usas para firmar el token (es importante que esta clave sea segura)
        const secret = import.meta.env.CLAVE_SECRETA || 'mi_clave_secreta'; 
        // Verifica el token
        const decoded = jwt.verify(token, secret);

      return {
        status: "authorized",
        payload: decoded,
        msg: "successfully verified auth token",
      };
    } catch (err) {
        console.debug(err);
        return { status: "error", msg: "could not validate auth token" };
    }
  };

export const tokenValid = async (token) => {
 
    const tokenValidation = await verifyAuth(token);
    return tokenValidation?.status == "authorized";
}