import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import Datepicker from './DatePicker';
import InputForm from './InputForm';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaRegister } from '../validation/userValidationSchema';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/utils';

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
    // Estado de la autenticación
    const { initializeAuth } = useAuthStore();

    const { handleRegister, errorMessage, clearErrorMessage } = useAuth();

    // Usa useForm con tipos explícitos
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: zodResolver(schemaRegister),  // Usamos el resolver de Zod con el esquema importado
    });


    useEffect(() => {
        clearErrorMessage();
    }, [])

    useEffect(() => {
        // Inicialización de la autenticación si es necesario
        initializeAuth();
    }, [initializeAuth]);


    // Función que maneja el envío del formulario
    const onSubmit = async (data: IFormInput) => {
        const userRegister = {
            nombreDeUsuario: data.userName,
            nombre: data.firstName,
            apellido: data.lastName,
            email: data.email,
            telefono: data.phone,
            fechaDeNacimiento: formatDate(data.bornDate),
            password: data.password,
            confirmacionPassword: data.confirmPassword,
            rol: "Usuario"
        }

        await handleRegister(userRegister);
    };

    return (
        <div className="flex w-full h-[calc(100vh-72px)] justify-center items-center gap-5 ">

            <div className="h-4/5 w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-indigo-950 dark:border-white-700 bg-indigo-950 bg-opacity-40">


                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h3 className='text-4xl pb-10'>Facilita tus finanzas</h3>
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-48"
                        alt="Flowbite Logo"
                    />
                </div>
            </div>

            <div className="h-4/5 w-full max-w-xl p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-indigo-950 dark:border-white-700 bg-indigo-950 bg-opacity-40">
                <form className="max-w-md mx-auto flex flex-col justify-between h-full" onSubmit={handleSubmit(onSubmit)}>

                    <InputForm type="text" name='userName' id='userName' label='Nombre de usuario' register={register} error={errors.userName} />
                    <InputForm type="email" name='email' id='email' label='Correo' error={errors.email} register={register} />
                    <InputForm type="password" name='password' id='password' label='Contraseña' register={register} error={errors.password} />
                    <InputForm type="password" name='confirmPassword' id='confirmPassword' label='Confirmar contraseña' register={register} error={errors.confirmPassword} />

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <InputForm type="text" name='firstName' id='firstName' label='Nombres' register={register} error={errors.firstName} />
                        <InputForm type="text" name='lastName' id='lastName' label='Apellidos' register={register} error={errors.lastName} />
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <InputForm type="tel" name='phone' id='phone' label='Teléfono' pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" register={register} error={errors.phone} />
                        <Datepicker register={register} error={errors.bornDate} />
                    </div>

                    <div className="grid md:grid-cols-1 md:gap-6 text-red-400">
                        {errorMessage && errorMessage.errors &&
                            <p> Error al registrar </p>
                            &&
                            errorMessage.errors.map((element: { code: string, description: string }, index: number) => (
                                <p key={index}>{element.description}</p>
                            ))
                        }
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