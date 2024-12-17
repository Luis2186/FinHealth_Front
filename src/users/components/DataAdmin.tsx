import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/userApi';

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
    activo: string;
    email: string;
}
export const DataAdmin = () => {
    const [usuarios, setUsuarios] = useState<user[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<{
        id: number;
        name: string;
        position: string;
        email: string;
        status: string;
    } | null>(null);


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

    // Función para abrir y cerrar el modal
    const toggleModal = () => {
        setShowModal(!showModal);
    };

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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                {/* Botón de acción */}
                <div>
                    <button
                        onClick={toggleModal}
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
                <div className="relative">
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
                            <td className="px-6 py-4">
                                <button
                                    // onClick={() => {
                                    //     setSelectedUser(user); // Establecer usuario para editar
                                    //     toggleModal(); // Abrir el modal
                                    // }}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit user
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de edición */}
            {showModal && selectedUser && (
                <div
                    id="editUserModal"
                    className="fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative w-full max-w-2xl max-h-full">
                        <form className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit user</h3>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={selectedUser.name.split(' ')[0]} // Suponiendo que el nombre tiene un solo espacio
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={selectedUser.name.split(' ')[1]} // Suponiendo que el nombre tiene un solo espacio
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Save all
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};