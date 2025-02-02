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


export const Categorie = () => {
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
    

  return (
    <>
        <div className='w-full h-auto flex flex-row gap-5 justify-center items-center p-3 my-5 mb-10'>
            {categories.map (categorie => (
                <button key={categorie.id} className='flex align-middle place-items-center gap-1 px-3 py-1 text-white dark:text-dark_text
                bg-light_main/60 rounded-xl hover:bg-light_hover focus:bg-light_focus active:bg-light_active focus:outline-none focus:ring focus:ring-light_focus/10
                dark:bg-dark_main dark:hover:bg-dark_hover'
                 onClick={() => handleCategorie(categorie)}
                 >
                    <img src={`../../../public/img/${obtenerNombreImg(categorie.nombre)}`} alt={"Icono_Gasto_" + categorie.nombre} className='w-10 '/>
                    <p className=''> {categorie.nombre}  </p>
                    {/* <p> {categorie.descripcion}  </p>         */}
                </button>
            ) )}
        </div>
        {currentCategorie && (

            <div className='flex w-full justify-center '>
                <SubCategories categoriaId={currentCategorie.id} familiaId={3}/>
            </div>
        )}
    </>
  )
}
