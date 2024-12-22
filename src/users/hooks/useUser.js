import React from 'react'

import { getUsers } from '../api/userApi';
import {  updateUser as updateUserApi, getUsers as getUs, getUserById,createUser ,deleteUser ,getRolesbyUser , addRol,RemoveRol } from '../api/userApi';
import useUserStore from '../store/useUserStore';

export const useUser = () => {

const {users,loading,errorMessage,onLoading,onError, onGetAllUsers, onRegister, onRemoveUser , onUpdateUser } = useUserStore();


const handleUpdate = async (idUser, userUpdate) => {
    try {
        onLoading();

        const user= await updateUserApi(idUser,userUpdate);
        onUpdateUser(user.id,user)
    } catch (error) {
        onError( error ); 
    } 
}

const handleGetAllUsers = async () => {
    try {
        onLoading();
        const users = await getUs();
        onGetAllUsers(users)
        
    } catch (error) {
        onError( error ); 
    }  
}

const handleGetUserById = async (userId) => {
    try {
        onLoading();
        const user = await getUserById(userId);
        
    } catch (error) {
        onError( error ); 
    } 
}

const handleRemoveUser = async (userId) => {
    try {
        onLoading();
        const user = await deleteUser(userId);
        onRemoveUser(userId)
    } catch (error) {
        onError( error ); 
    } 
}



return {
    users,
    loading,
    errorMessage,
    errorMessage,
    handleUpdate,
    handleGetAllUsers,
    handleRemoveUser,
  };
}
