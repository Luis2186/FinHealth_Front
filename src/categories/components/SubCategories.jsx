import { faTrashCan, faPenToSquare, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SubCategories = ({subCategories}) => {
  
 
    return (
 
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-9/12 h-full ">
        
        <div className='container w-full h-full flex justify-end'>
            <button
                    className="font-medium dark:text-primary-500 flex gap-2 text-lg text-primary-600 bg-white px-3 py-2 rounded-t-lg items-center"
                    onClick={() => handleRemoveUser(user.id)}
                >
                    <span className=''>Agregar categoria </span>
                    <FontAwesomeIcon icon={faCirclePlus} className='fa-lg text-primary-600' />
            </button>
        </div>


        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Descripcion
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {subCategories?.map(cat => (
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {cat.nombre}
                        </th>
                        <td class="px-6 py-4">
                        {cat.descripcion}
                        </td>
                        <td className="px-2 py-4 flex justify-center">
                            <button
                                onClick={() => handleModal(user)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className='fa-xl pr-5 text-indigo-500' />
                            </button>

                            <button
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => handleRemoveUser(user.id)}
                            >
                                <FontAwesomeIcon icon={faTrashCan} className='fa-xl text-red-500 pr-5' />
                            </button>
                    </td>
                    </tr>
                ))}

{/* 

                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                        Silver
                    </td>
                    <td class="px-6 py-4">
                        Laptop
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-4">
                        White
                    </td>
                    <td class="px-6 py-4">
                        Laptop PC
                    </td>
                    <td class="px-6 py-4">
                        $1999
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">
                        Black
                    </td>
                    <td class="px-6 py-4">
                        Accessories
                    </td>
                    <td class="px-6 py-4">
                        $99
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr> */}
            </tbody>
        </table>
    </div>

  )
}
