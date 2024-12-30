import jwt from 'jsonwebtoken';  // Asegúrate de tener jwt en tu proyecto
import { defineMiddleware } from "astro/middleware";

const INDEX_PATH = "/";

const verifyAuth = async (token) => {
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

const middleware = async (context, next) => {

    const cookies = context.request.headers.get("Cookie");
    const token = cookies && cookies.match(/token=([^;]+)/)?.[1];

      // Comprobar si ya está en la página de inicio de sesión
    if (context.request.url.includes("/LoginPage")) {
        // Si ya está en la página de login, no hacemos nada
        return next();
    }

    if (token) {
        const validationResult = await verifyAuth(token);
        
        if (validationResult) {
          // forward request 
          return next();
        }
        return Response.redirect(new URL("/LoginPage", context.url), 302);
    }



    
    return Response.redirect(new URL("/LoginPage", context.url), 302);

};

export const onRequest = middleware;




// export async function onRequest({ request, context }) {
//   // Obtener las cookies de la solicitud
//   const cookies = request.headers.get('cookie');
//   const currentUrl = new URL(request.url);

//   // Extraer el token de la cookie 'token'
//   const token = cookies && cookies.match(/token=([^;]+)/)?.[1];  // Buscar la cookie 'token'

//   // Si no hay token, redirigir al login
//   if (!token) {
//     const loginUrl = new URL('/LoginPage', request.url);  // Construir la URL de login con la base de la URL actual
    
//     // Evitar redirigir si ya estamos en la página de login
//     if (currentUrl.pathname === '/LoginPage') {
//         return new Response(null, { status: 302 }); // Si estamos en la página de login, continuar con la solicitud
//     }
    
//     loginUrl.searchParams.set('redirect', request.url);   // Agregar el path de la URL actual como parámetro de redirección
//     // Redirigir al login si no hay token
//     return Response.redirect(loginUrl.toString(), 302);  // Redirige con el código de estado 302
//   }

//   try {
//     // Verificar que el token es válido usando la clave secreta
//     jwt.verify(token, import.meta.env.CLAVE_SECRETA);  // Usar la misma clave secreta que usas para firmar el JWT
//   } catch (error) {
//     // Si el token es inválido o ha expirado, redirigir al login
//     const loginUrl = new URL('/LoginPage', request.url);  // Construir la URL de login con la base de la URL actual
//     loginUrl.searchParams.set('redirect', request.url);   // Agregar el path de la URL actual como parámetro de redirección

//     return Response.redirect(loginUrl.toString(), 302);  // Redirige con el código de estado 302
//   }

//   // Si el token es válido, continuar con la solicitud
//   return new Response(null, { status: 200 });  // Continúa con la solicitud si el token es válido
// }