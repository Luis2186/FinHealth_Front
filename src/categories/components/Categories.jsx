import React, { useEffect, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useCategorieStore } from '../store/useCategorieStore';
import { SubCategories } from './SubCategories';

const obtenerNombreImg = (nombre) => {
    // Usamos toLowerCase() para que la comparación no distinga entre mayúsculas y minúsculas
    const nombreLower = nombre.toLowerCase();

    if (nombreLower.includes("fijos")) {
        return "fijos.png";
    } else if (nombreLower.includes("ahorro")) {
        return "ahorro.png";
    } else if (nombreLower.includes("familiar")) {
        return "familiar.png";
    } else if (nombreLower.includes("variable")) {
        return "variable.png";
    } else if (nombreLower.includes("imprevisto")) {
        return "imprevisto.png";
    } else {
        return ""; // En caso de no encontrar ninguna coincidencia
    }
}


export const Categories = () => {
   const {handleGetAllCategories} = useCategories();
   //const {categories} = useCategorieStore(state => state); 
    const [categories, setCategories] = useState([])
    const [currentCategorie, setCurrentCategorie] = useState([])

    const handleCategorie = (categorie) => {
        setCurrentCategorie(categorie);
    };

   useEffect(() => {
    // If handleGetAllCategories returns a promise, use async/await
    const fetchCategories = async () => {
        const data = await handleGetAllCategories();
        setCategories(data);
    };

    fetchCategories();
    }, [])
    console.log(currentCategorie)

  return (
    <>
        <div className='w-full h-auto flex flex-row gap-5 justify-center items-center p-3 mb-10'>
            {categories.map (categorie => (
                <button className='flex align-middle place-items-center gap-1 px-3 py-1 bg-primary-600 rounded-xl hover:bg-primary-500 focus:bg-primary-600
                active:bg-primary-700 focus:outline-none focus:ring focus:ring-white' onClick={() => handleCategorie(categorie)}>
                    <img src={`../../../public/img/${obtenerNombreImg(categorie.nombre)}`} alt={"Icono_Gasto_" + categorie.nombre} className='w-10'/>
                    <p className=''> {categorie.nombre}  </p>
                    {/* <p> {categorie.descripcion}  </p>         */}
                </button>
            ) )}
        </div>
        {currentCategorie && (

            <div className='flex w-full justify-center '>
                <SubCategories subCategories={currentCategorie.subCategorias}/>
            </div>
        )}
    </>
  )
}
