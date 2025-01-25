import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { user } from '../types/user';
import { InputForm } from '../../components/Modals/Form/inputForm';

interface ModalProps {
    user: user;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (userId: string, user: user) => void;
}

export const Modal: React.FC<ModalProps> = ({ user, isOpen, onClose, onUpdate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<user>({
        defaultValues: user, // Establecer los valores predeterminados a partir del usuario pasado
    });


    const onSubmit = async (data: user) => {
        console.log(user)
        await onUpdate(data.id, data);  // Como 'activo' ya es booleano, no necesitamos hacer ninguna conversión
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="relative bg-white dark:bg-gradient-to-br from-primary-800 to-primary-950 rounded-lg shadow-lg max-w-lg w-full p-6 text-black">
                        <div className="flex justify-between items-center border-b border-primary-500 pb-4">
                            <h3 className="text-xl font-semibold text-dark_text_light">Actualizar Usuario</h3>
                            <button onClick={onClose} className="text-dark_text_light hover:text-primary-800">
                                <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

                            <InputForm label='Nombre' name='nombre' register={register} errors={errors.nombre} type='text' />
                            <InputForm label='Apellido' name='apellido' register={register} errors={errors.apellido} type='text' />
                            <InputForm label='Edad' name='edad' register={register} errors={errors.edad} type='text' />
                            <InputForm label='Nombre de usuario' name='nombreDeUsuario' register={register} errors={errors.nombreDeUsuario} type='text' />
                            <InputForm label='Fecha de nacimiento' name='fechaDeNacimiento' register={register} errors={errors.fechaDeNacimiento} type='date' />
                            <InputForm label='Teléfono' name='telefono' register={register} errors={errors.telefono} type='text' />
                            <InputForm label='Email' name='email' register={register} errors={errors.email} type='text' />
                            <InputForm label='Activo' name='activo' register={register} errors={errors.activo} type='select' options={["Si", "No"]} />

                            <div className="flex justify-end space-x-4 mt-6">
                                {/* Botones */}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm text-dark_text_light border border-primary-300 rounded-md hover:bg-primary-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500"
                                >
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};