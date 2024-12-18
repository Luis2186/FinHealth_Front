import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faUserPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Modal } from './Modal';

interface user {
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
export const DataAdmin = () => {
    const [usuarios, setUsuarios] = useState<user[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<user>();


    useEffect(() => {
        fetchUsers()
    }, [])

    // Función para obtener los usuarios
    const fetchUsers = async () => {
        try {
            const usersData = await getUsers();
            setUsuarios(usersData); // Guardamos los usuarios en el estado
            console.log(usersData); // Solo para depuración
        } catch (error) {
            console.error("Error fetching usuarios:", error);
        }
    };

    const handleUpdate = (updatedUser: user) => {
        console.log('Usuario actualizado:', updatedUser);
    };

    const handleModal = (usuario: user) => {
        setSelectedUser(usuario)
        setIsModalOpen(!isModalOpen)
        console.log(selectedUser)
    }

    console.log(selectedUser)
    // Función para manejar la búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // // Datos de ejemplo para la tabla
    // const usuarios = [
    //     { id: 1, name: 'Neil Sims', position: 'React Developer', email: 'neil.sims@flowbite.com', status: 'Online' },
    //     { id: 2, name: 'John Doe', position: 'Backend Developer', email: 'john.doe@company.com', status: 'Offline' },
    //     // Agregar más usuarios aquí...
    // ];

    // Filtrar los usuarios por la búsqueda
    const filteredUsers = usuarios.filter(user =>
        user.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.apellido?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='container mx-auto py-20'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    {/* Botón de acción */}
                    <div className='px-5'>
                        <button
                            onClick={() => { }}
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                        >
                            Action
                            <svg
                                className="w-2.5 h-2.5 ms-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* Campo de búsqueda */}
                    <div className="relative px-5">
                        <input
                            type="text"
                            id="table-search-usuarios"
                            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for usuarios"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Tabla de usuarios */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3"> Nombre de usuario </th>
                            <th scope="col" className="px-6 py-3"> Nombre </th>
                            <th scope="col" className="px-6 py-3"> Fecha de registro </th>
                            <th scope="col" className="px-6 py-3"> Roles </th>
                            <th scope="col" className="px-6 py-3"> Activo </th>
                            <th scope="col" className="px-6 py-3"> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-search-${user.id}`}

                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                </td>
                                <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="User" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{user.nombreDeUsuario}</div>
                                        <div className="font-normal text-gray-500">{user.email}</div>
                                    </div>
                                </th>


                                <td className="px-6 py-4">{user.nombre + " " + user.apellido}</td>
                                <td className="px-6 py-4">{user.fechaDeRegistro}</td>
                                <td className="px-6 py-4">{user.roles.map(rol => rol + " ")}</td>
                                <td className="px-6 py-4">{user.activo ? "Activo" : "Inactivo"}</td>
                                {/* <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full ${user.nombreDeUsuario === 'Online' ? 'bg-green-500' : 'bg-gray-500'} me-2`}></div>
                                        {user.nombreDeUsuario}
                                    </div>
                                </td> */}
                                <td className="px-2 py-4">
                                    <button
                                        onClick={() => handleModal(user)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <FontAwesomeIcon icon={faUserPen} className='fa-xl pr-5 text-indigo-500' />
                                    </button>

                                    <button
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <FontAwesomeIcon icon={faUserGear} className='fa-xl text-indigo-500 pr-5' />
                                    </button>

                                    <button
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} className='fa-xl text-red-500 pr-5' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isModalOpen && selectedUser &&
                    <Modal
                        user={selectedUser}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onUpdate={handleUpdate}
                    />
                }
            </div>
        </div>
    );
};