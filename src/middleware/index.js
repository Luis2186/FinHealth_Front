// Asegúrate de tener jwt en tu proyecto
import { tokencloseToExpiration, verifyAuth } from '../users/utils/utils.js';
import axios from 'axios';
import https from 'https';

const rutasPermitidasAdministrador = [
    "/UsersAdministration",
    "/Categories",
    "/Home",
];

const routesUsers = [
    "/UsersAdministration",
    "/Home",
];

const routesWithoutAuthentication  = [
    "/SignIn",
    "/SignUp"
];

const middleware = async (context, next) => {

    const routesWithoutAuth = routesWithoutAuthentication?.some(ruta => context.request.url.includes(ruta));
      // Deja pasar sin verificar el token las paginas incluidas
    if (routesWithoutAuth) {
        // Si ya está en la página de SignIn, no hacemos nada
        return next();
    }

    const cookies = context.request.headers.get("Cookie");
    let token = cookies && cookies.match(/access_token=([^;]+)/)?.[1];

    let validationResult = await verifyAuth(token);
    const tokenCloseToExpiration = validationResult.closeToExpiration
   
    if (validationResult.status == "unauthorized" || tokenCloseToExpiration) {
        const response = await validateAndRefreshToken(context)
        
        if(response?.status == 404) return Response.redirect(new URL("/SignIn", context.url), 302);

        //return Response.redirect(new URL(context.url), 302);
        return next();
    }

    if(validationResult && validationResult?.payload?.roles)
    {
        const roles = validationResult?.payload.roles;
        const esRutaDeAdministrador = rutasPermitidasAdministrador?.some(ruta => context.request.url.includes(ruta));

        if( esRutaDeAdministrador && !roles.includes("sys_adm") && !roles.includes("administrador")) return Response.redirect(new URL("/SignIn", context.url), 302);

        if (validationResult) {
           
            return next();
        }
    }

    return Response.redirect(new URL("/SignIn", context.url), 302);
};


const validateAndRefreshToken = async (context ) => {
    
    try {
        const cookies = context.request.headers.get("Cookie");
        let refreshTokenCookie = cookies && cookies.match(/refresh_token=([^;]+)/)?.[1];
    
        if (!refreshTokenCookie) {
            return {
              status: 404,
              title: 'Error refresh token',
              msg: "Please pass a request refresh token",
            };
          }

        const res = await generarRefreshToken(refreshTokenCookie)
        
        if(res?.data?.accessToken && res?.data?.refreshToken){
            context.cookies.set("access_token", res.data.accessToken, {
                httpOnly: true, // Solo accesible por HTTP, no en JavaScript
                secure: true,   // Solo se enviará sobre HTTPS
                sameSite: "None", // Mejora la seguridad, solo se enviará en solicitudes al mismo origen
                maxAge: 60 * 6 ,   // Por ejemplo, 1 hora de duración
            });
    
            context.cookies.set("refresh_token", res.data.refreshToken, {
                httpOnly: true, 
                secure: true,   
                sameSite: "None", 
                maxAge: 60 * 129600,  
            });
            return {
                status: "authorized",
                msg: "successfully verified auth token"
            }
        }

    } catch (error) {
        console.log(error)
        // context.cookies.delete("access_token");
        // context.cookies.delete("refresh_token");
        return error;
    }    
}

const generarRefreshToken = async (refreshToken) => {

    try {   
        // Crear un agente HTTPS que no verifique el certificado
        const agent = new https.Agent({
            rejectUnauthorized: false,  // Esto desactiva la validación del certificado
        });

        // Configurar axios para usar este agente
        const axiosInstance = axios.create({
            baseURL: 'https://localhost:7292',
            //         withCredentials : true,
            headers: {
            'Content-Type': 'application/json', // Establece el tipo de contenido por defecto
            },
            // URL del backend
            httpsAgent: agent,  // Agente que permite conexiones inseguras
        });
        
        if(!refreshToken) return

        const response = await axiosInstance.post('usuario/refresh-token',refreshToken);
        
        return response; 

    } catch (error) {
        throw error.response ? error.response.data : error.message; 
    }
}


export const onRequest = middleware;

