
export interface user {
    id: string
    nombre: string;
    apellido: string;
    edad: number;
    nombreDeUsuario: string;
    fechaDeNacimiento: string;
    fechaDeRegistro: string;
    roles: [string];
    telefono: string;
    activo: boolean;
    email: string;
}