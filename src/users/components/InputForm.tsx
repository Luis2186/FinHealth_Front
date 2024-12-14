
interface Props {
    type: string;      // Tipo del input (e.g., 'text', 'password', 'email')
    name: string;      // Nombre del campo input
    id: string;        // ID del input (útil para accesibilidad y selección)
    placeholder?: string; // Texto placeholder para el input
    label: string;     // Texto que sirve como etiqueta del input
    required?: boolean;  // Propiedad opcional para hacer el campo requerido o no
    pattern?: string;
    register: any;
    validation?: object;
    error?: any;  // Errores de validación
}


export const InputForm: React.FC<Props> = ({ type, name, id, placeholder = " ", label, required, pattern, register, validation, error }) => {


    return (
        <div className="relative z-0 w-full mb-5 group">
            <input
                type={type}
                name={name}
                id={id}
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder={placeholder}
                required={required}
                pattern={pattern}
                {...register(name, validation)}
            />

            <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {label}
            </label>
            {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>} {/* Mostrar el error debajo del input */}
        </div>

    )
}

export default InputForm;