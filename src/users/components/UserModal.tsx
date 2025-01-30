import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../components/Modals/Form/InputForm';
import { Modal } from './Modal';  // Asegúrate de importar el Modal genérico
import type { user } from '../types/user';

interface UserModalProps {
    user: user;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (userId: string, user: user) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose, onUpdate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<user>({
        defaultValues: user,
    });

    const onSubmit = async (data: user) => {
        await onUpdate(data.id, data);
        onClose();
    };

    return (
        <Modal title="Actualizar Usuario" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
            <InputForm label="Nombre" name="nombre" register={register} errors={errors.nombre} type="text" floating={false} />
            <InputForm label="Apellido" name="apellido" register={register} errors={errors.apellido} type="text" floating={false} />
            <InputForm label="Edad" name="edad" register={register} errors={errors.edad} type="text" floating={false} />
            <InputForm label="Nombre de usuario" name="nombreDeUsuario" register={register} errors={errors.nombreDeUsuario} type="text" floating={false} />
            <InputForm label="Fecha de nacimiento" name="fechaDeNacimiento" register={register} errors={errors.fechaDeNacimiento} type="date" floating={false} />
            <InputForm label="Teléfono" name="telefono" register={register} errors={errors.telefono} type="text" floating={false} />
            <InputForm label="Email" name="email" register={register} errors={errors.email} type="text" floating={false} />
            <InputForm label="Activo" name="activo" register={register} errors={errors.activo} type="select" options={["Si", "No"]} floating={false} />
        </Modal>
    );
};