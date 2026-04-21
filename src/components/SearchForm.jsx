import { useState } from 'react';
import { toast } from 'react-toastify';

function SearchForm({ onSearch }) {
  const [busqueda, setBusqueda] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica: que no busque un string vacío o con puros espacios
    if (busqueda.trim() === '') {
      toast.warning('Por favor ingresa un nombre para buscar');
      return;
    }
    
    // Llamamos a la función que nos pasan por props desde App.jsx
    onSearch(busqueda);
  };

  const handleClear = () => {
    setBusqueda('');
    onSearch(''); // Volvemos a cargar todos los personajes
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-2 mb-8">
      <input
        type="text"
        placeholder="Buscar personaje (ej. Rick)..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="grow p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Buscar
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Limpiar
      </button>
    </form>
  );
}

export default SearchForm;
