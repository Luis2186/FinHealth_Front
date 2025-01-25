// Asegúrate de tener jwt en tu proyecto
import { refreshToken } from '../users/api/userApi';
import { tokencloseToExpiration, verifyAuth } from '../users/utils/utils.js';

const rutasPermitidasAdministrador = [
    "/AdminUsersPage",
];

const routesUsers = [
    "/AdminUsersPage",
];

const routesWithoutAuthentication  = [
    "/LoginPage",
    "/RegisterPage"
];

const middleware = async (context, next) => {

    const routesWithoutAuth = routesWithoutAuthentication?.some(ruta => context.request.url.includes(ruta));
      // Deja pasar sin verificar el token las paginas incluidas
    if (routesWithoutAuth) {
        // Si ya está en la página de login, no hacemos nada
        return next();
    }

    const cookies = context.request.headers.get("Cookie");
    let token = cookies && cookies.match(/access_token=([^;]+)/)?.[1];

    console.log(token)
    let validationResult = await verifyAuth(token);
    const tokenCloseToExpiration = validationResult.closeToExpiration
   
    if (validationResult.status == "unauthorized" || tokenCloseToExpiration) {
        const response = await validateAndRefreshToken(context)
        if(response?.status == 404) return Response.redirect(new URL("/LoginPage", context.url), 302);

        //return Response.redirect(new URL(context.url), 302);
        return next();
    }

    if(validationResult?.payload?.roles)
    {
        const roles = validationResult?.payload.roles.toLowerCase();
        const esRutaDeAdministrador = rutasPermitidasAdministrador?.some(ruta => context.request.url.includes(ruta));

        if( esRutaDeAdministrador && roles != "sys_adm") return Response.redirect(new URL("/LoginPage", context.url), 302);

        if (validationResult) {
           
            return next();
        }
    }

    return Response.redirect(new URL("/LoginPage", context.url), 302);
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
        
        const res = await refreshToken(refreshTokenCookie)
        console.log(res)
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












export const onRequest = middleware;

