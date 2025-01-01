import React, { useEffect, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useCategorieStore } from '../store/useCategorieStore';

export const Categories = () => {
   const {handleGetAllCategories} = useCategories();
   const {categories} = useCategorieStore(state => state); 


   useEffect(() => {
        handleGetAllCategories();
    }, [])

  return (
    <div>
        {categories.map (categorie => (
            <>
            <p> {categorie.nombre}  </p>
            <p> {categorie.descripcion}  </p>
            <br/>
            </>
        ) )}
    </div>
  )
}
