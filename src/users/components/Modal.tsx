import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { user } from '../types/user';
import { useUser } from '../hooks/useUser';


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
                    <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 text-black">
                        <div className="flex justify-between items-center border-b border-indigo-500 pb-4">
                            <h3 className="text-xl font-semibold text-indigo-600">Actualizar Usuario</h3>
                            <button onClick={onClose} className="text-indigo-600 hover:text-indigo-800">
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
                            {/* Nombre */}
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-medium text-indigo-600">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    {...register("nombre")}
                                    className="mt-1 p-2 block w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Apellido */}
                            <div>
                                <label htmlFor="apellido" className="block text-sm font-medium text-indigo-600">Apellido</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    {...register("apellido")}
                                    className="mt-1 p-2 block w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Edad */}
                            <div>
                                <label htmlFor="edad" className="block text-sm font-medium text-indigo-600">Edad</label>
                                <input
                                    type="number"
                                    id="edad"
                                    {...register("edad")}
                                    className="mt-1 p-2 block w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Nombre de Usuario */}
                            <div>
                                <label htmlFor="nombreDeUsuario" className="block text-sm font-medium text-indigo-600">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    id="nombreDeUsuario"
                                    {...register("nombreDeUsuario")}
                                    className="mt-1 p-2 block w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Fecha de Nacimiento */}
                            <div>
                                <label htmlFor="fechaDeNacimiento" className="block text-sm font-medium text-indigo-600">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    id="fechaDeNacimiento"
                                    {...register("fechaDeNacimiento")}
                                    className="mt-1 p-2 block w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label htmlFor="telefono" className="block text-sm font-medium text-indigo-600">Teléfono</label>
                                <input
                                    type="text"
                                    id="telefono"
                                    {...register("telefono")}
                                    className="mt-1 p-2 block w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-indigo-600">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    className="mt-1 p-2 block w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Activo */}
                            <div>
                                <label htmlFor="activo" className="block text-sm font-medium text-indigo-600">Activo</label>
                                <select
                                    id="activo"
                                    {...register("activo")}
                                    className="mt-1 p-2 block w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-4 mt-6">
                                {/* Botones */}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm text-indigo-600 border border-indigo-300 rounded-md hover:bg-indigo-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
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