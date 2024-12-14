import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import Datepicker from './DatePicker';
import InputForm from './InputForm';
import { useForm } from "react-hook-form"

interface IFormInput {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
    bornDate: string;
}

const Register = () => {
    // Obtén el estado de la autenticación
    const { isAuthenticated, initializeAuth, login } = useAuthStore();

    // Estado para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    // Usa useForm con tipos explícitos
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    // Función que maneja el envío del formulario
    const onSubmit = (data: IFormInput) => {
        console.log(data); // Aquí puedes hacer lo que quieras con los datos
    };


    useEffect(() => {
        // Inicialización de la autenticación si es necesario
        initializeAuth();
    }, [initializeAuth]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // Aquí podrías manejar el inicio de sesión, por ejemplo
    //     await login(email, password)
    //     console.log('Iniciar sesión con:', email, password, remember);
    // };

    return (
        <div className="flex w-full h-[calc(100vh-72px)] justify-center items-center gap-5">

            <div className="h-4/5 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-indigo-950 dark:border-white-700">


                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h3 className='text-4xl pb-10'>Facilita tus finanzas</h3>
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-48"
                        alt="Flowbite Logo"
                    />
                </div>
            </div>


            <div className="h-4/5 w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-indigo-950 dark:border-white-700">
                <form className="max-w-md mx-auto flex flex-col justify-between h-full" onSubmit={handleSubmit(onSubmit)}>

                    <InputForm type="text" name='userName' id='userName' required label='Nombre de usuario' register={register} validation={{ required: "El campo nombre es obligatorio", minLength: { value: 6, message: "El nombre de usuario debe tener más de 6 caracteres" } }} error={errors.userName} />
                    <InputForm type="email" name='email' id='email' required label='Correo' error={errors.email} register={register} validation={{ required: "El campo correo es obligatorio" }} />
                    <InputForm type="password" name='password' id='password' required label='Contraseña' register={register} error={errors.password} validation={{ required: "El campo contraseña es obligatorio" }} />
                    <InputForm type="password" name='confirmPassword' id='confirmPassword' required label='Confirmar contraseña' register={register} error={errors.confirmPassword} validation={{ required: "El campo confirmar contraseña es obligatorio" }} />

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <InputForm type="text" name='firstName' id='firstName' required label='Nombres' register={register} error={errors.firstName} validation={{ required: "El campo nombres es obligatorio" }} />
                        <InputForm type="text" name='lastName' id='lastName' required label='Apellidos' register={register} error={errors.lastName} validation={{ required: "El campo apellidos es obligatorio" }} />
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <InputForm type="tel" name='phone' id='phone' required label='Teléfono' pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" register={register} error={errors.phone} validation={{ required: "El campo teléfono es obligatorio" }} />
                        <Datepicker />
                    </div>

                    <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 mt-auto">
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;