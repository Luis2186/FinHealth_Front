import { faTrashCan, faPenToSquare, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SubCategories = ({subCategories}) => {
  
 
    return (
 
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/12 h-full bg-l-gradient-asideMenu">
        
        <div className='container w-full h-full flex justify-end text-light_text_menu hover:text-primary-50 dark:hover:text-white dark:text-primary-950'>
            <button
                    className="font-medium flex gap-2 text-lg  bg-transparent  px-3 py-2 rounded-tr-lg items-center " 
                    onClick={() => handleRemoveUser(user.id)}
                >
                    <span className=''>Agregar categoria </span>
                    <FontAwesomeIcon icon={faCirclePlus} className='fa-lg ' />
            </button>
        </div>


        <table className="w-full text-sm text-left rtl:text-right text-light_text dark:text-dark_text ">
            <thead className="table-head">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Descripcion
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {subCategories?.map(cat => (
                     <tr className="table-tr" key={cat.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {cat.nombre}
                        </th>
                        <td className="px-6 py-4">
                            {cat.descripcion}
                        </td>
                        <td className="px-2 py-4 flex justify-center">
                            <button
                                onClick={() => handleModal(user)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className='fa-xl pr-5 text-light_icons dark:text-dark_icons' />
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

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">
                        Silver
                    </td>
                    <td className="px-6 py-4">
                        Laptop
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                    </th>
                    <td className="px-6 py-4">
                        White
                    </td>
                    <td className="px-6 py-4">
                        Laptop PC
                    </td>
                    <td className="px-6 py-4">
                        $1999
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                    </th>
                    <td className="px-6 py-4">
                        Black
                    </td>
                    <td className="px-6 py-4">
                        Accessories
                    </td>
                    <td className="px-6 py-4">
                        $99
                    </td>
                    <td className="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr> */}
            </tbody>
        </table>
    </div>

  )
}
