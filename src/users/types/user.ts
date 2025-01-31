
export interface user {
    id: string
    nombre: string;
    apellido: string;
    edad: number;
    nombreDeUsuario: string;
    fechaDeNacimiento: string;
    fechaDeRegistro: string;
    roles: string[];
    telefono: string;
    activo: boolean;
    email: string;
}

interface UserStoreState {
    users: user[]; // Array de objetos tipo User
    loading: boolean;
    errorMessage?: string;

    // Métodos para manipular el estado
    onLoading: () => void;
}

export interface Rol {
    id: string
    rol: string;
}