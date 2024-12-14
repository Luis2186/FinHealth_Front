import { z } from 'zod';

// Definir el esquema de validación usando Zod
export const schema = z.object({
    userName: z.string()
        .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
        .max(20, 'El nombre de usuario no puede tener más de 20 caracteres')
        .nonempty('El nombre de usuario es obligatorio'),
    email: z.string()
        .email('Correo electrónico inválido')
        .nonempty('El correo es obligatorio'),
    firstName: z.string()
        .nonempty('El nombre es obligatorio'),
    lastName: z.string()
        .nonempty('El apellido es obligatorio'),
    phone: z.string()
        .nonempty('El telefono es obligatorio'),
    bornDate: z.string()
        .nonempty('La fecha de nacimiento es obligatoria'),
    password: z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .nonempty('La contraseña es obligatoria'),
    confirmPassword: z.string()
        .min(6, 'La confirmación de la contraseña debe tener al menos 6 caracteres')
        .nonempty('La confirmación de la contraseña es obligatoria'),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
});

export type FormData = z.infer<typeof schema>;


