
import React, { useEffect, useState } from 'react';

const Datepicker= () => {
    const [isClient, setIsClient] = useState(false);

    // El código solo se ejecute en el cliente
    useEffect(() => {
      setIsClient(true); // Indica que el componente se ha montado en el cliente
    }, []);
  
    useEffect(() => {
      if (isClient) {
        // Inicializamos Flowbite solo en el cliente
        const datepicker = document.getElementById('datepicker-autohide');
        if (datepicker) {
          // Inicializa Flowbite Datepicker
          new window.Datepicker(datepicker, {
            autohide: true,
          });
        }
      }
    }, [isClient]); // Se ejecuta solo cuando isClient es true
  
    return (
      isClient && ( // Renderiza el componente solo en el cliente
        <div className="relative z-0 w-full mb-5 group">
          <div className="h-11 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-blue-200 dark:blue-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id="datepicker-autohide"
            name="bornDate"
            datepicker="true"
            datepicker-autohide="true"
            type="text"
            className="bg-gray-50 border h-auto border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-indigo-700 dark:border-gray-600 dark:placeholder-blue-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fecha de nacimiento"
            required
          />
        </div>
      )
    );
  };
  

export default Datepicker;