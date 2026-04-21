import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import CharacterCard from './components/CharacterCard';

function App() {
  // Estados principales
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [infoPagina, setInfoPagina] = useState({});

  // Estado para la vista: ¿mostramos todos o solo favoritos?
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  // Estado de favoritos inicializado con localStorage
  const [favoritos, setFavoritos] = useState(() => {
    const favsGuardados = localStorage.getItem('favoritos');
    return favsGuardados ? JSON.parse(favsGuardados) : [];
  });

  // Cada vez que 'favoritos' cambia, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);
  
  // Función para obtener los personajes usando fetch
  const obtenerPersonajes = async (parametro = "") => {
    setCargando(true);
    setMostrarFavoritos(false); // Si busca, volvemos a la vista general
    try {
      // Si el parámetro ya es una URL (viene del paginado), la usamos.
      // Si no, asumimos que es una búsqueda (por nombre) del formulario y armamos la URL.
      const url = parametro.startsWith('http') 
        ? parametro 
        : `https://rickandmortyapi.com/api/character/${parametro ? `?name=${parametro}` : ''}`;
      
      const respuesta = await fetch(url);
      
      // Si la respuesta no es ok (ej. 404 no se encontró), lanzamos error
      if (!respuesta.ok) {
        throw new Error('No se encontraron personajes');
      }

      const datos = await respuesta.json();
      setPersonajes(datos.results);

      // Guardamos la "info" del paginado
      setInfoPagina(datos.info);
      
      // Solo mostramos éxito si fue una búsqueda del formulario
      if (parametro && !parametro.startsWith('http')) {
        toast.success('¡Personajes encontrados!');
      }

    } catch (error) {
      console.error(error);
      setPersonajes([]); // Limpiamos la lista en caso de error
      setInfoPagina({}); // Limpiamos la paginación en caso de error
      toast.error(error.message || 'Hubo un error al buscar we!');
    } finally {
      setCargando(false);
    }
  };

  // Función para agregar o quitar de favoritos
  const toggleFavorito = (personaje) => {
    const esFavorito = favoritos.some((fav) => fav.id === personaje.id);
    
    if (esFavorito) {
      // Lo sacamos de la lista
      setFavoritos(favoritos.filter((fav) => fav.id !== personaje.id));
      toast.info(`Eliminaste a ${personaje.name} de favoritos`);
    } else {
      // Lo agregamos a la lista
      setFavoritos([...favoritos, personaje]);
      toast.success(`Agregaste a ${personaje.name} a favoritos`);
    }
  };

  // Cargar personajes iniciales al montar el componente
  useEffect(() => {
    obtenerPersonajes();
  }, []);

  // Decidimos qué lista mostrar en base al estado 'mostrarFavoritos'
  const listaRenderizada = mostrarFavoritos ? favoritos : personajes;

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white items-center">
      {/* Contenedor de notificaciones */}
      <ToastContainer position="bottom-right" theme="dark" />

      {/* Contenido principal que tomará todo el espacio posible para empujar el footer abajo */}
      <main className="grow w-full max-w-5xl p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-400">
          Rick & Morty Explorer
        </h1>

        {/* Formulario de busqueda, pasándole la función de búsqueda por props */}
        <SearchForm onSearch={obtenerPersonajes} />

        {/* Botones para alternar vistas */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setMostrarFavoritos(false)}
            className={`px-4 py-2 rounded font-bold transition-colors ${!mostrarFavoritos ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Inicio
          </button>
          <button 
            onClick={() => setMostrarFavoritos(true)}
            className={`px-4 py-2 rounded font-bold transition-colors ${mostrarFavoritos ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Mis Favoritos ({favoritos.length})
          </button>
        </div>

        {/* Controles de Paginación (solo se muestran si no estamos viendo favoritos) */}
        {!mostrarFavoritos && infoPagina && (
          <div className="flex gap-4 mb-6 mt-4">
            <button
              onClick={() => obtenerPersonajes(infoPagina.prev)}
              disabled={!infoPagina.prev}
              className={`px-4 py-2 rounded font-bold transition-colors ${
                !infoPagina.prev ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Anterior
            </button>
            
            <button
              onClick={() => obtenerPersonajes(infoPagina.next)}
              disabled={!infoPagina.next}
              className={`px-4 py-2 rounded font-bold transition-colors ${
                !infoPagina.next ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Siguiente
            </button>
          </div>
        )}

        {/* Renderizado condicional */}
        {cargando ? (
          <p className="text-xl text-yellow-300 animate-pulse mt-10">Cargando personajes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
            {listaRenderizada.length > 0 ? (
              listaRenderizada.map((personaje) => {
                const esFavorito = favoritos.some((fav) => fav.id === personaje.id);
                
                return (
                  /* Componente que muestra personajes */
                  <CharacterCard 
                    key={personaje.id} 
                    personaje={personaje} 
                    esFavorito={esFavorito} 
                    toggleFavorito={toggleFavorito} 
                  />
                );
              })
            ) : (
              <p className="text-gray-400 text-center col-span-full text-lg mt-10">
                {mostrarFavoritos ? 'Todavía no tienes personajes favoritos.' : 'No hay personajes para mostrar.'}
              </p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
