function CharacterCard({ personaje, esFavorito, toggleFavorito }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600 flex flex-col h-full">
      <img 
        src={personaje.image} 
        alt={personaje.name} 
        className="w-full rounded-md mb-3 object-cover"
      />
      
      {/* Información principal */}
      <h2 className="text-2xl font-bold mb-2 text-green-400">{personaje.name}</h2>
      
      <div className="grow space-y-1 mb-4 text-gray-300">
        <p>
          <span className="font-semibold text-white">Estado:</span> {' '}
          {personaje.status === 'Alive' ? '🟢' : personaje.status === 'Dead' ? '🔴' : '⚪'} {personaje.status}
        </p>
        <p>
          <span className="font-semibold text-white">Especie:</span> {personaje.species}
        </p>
        {/* Aquí agregamos la descripción extra que pedía el TP */}
        <p>
          <span className="font-semibold text-white">Origen:</span> {personaje.origin?.name || 'Desconocido'}
        </p>
        <p>
          <span className="font-semibold text-white">Ubicación actual:</span> {personaje.location?.name || 'Desconocida'}
        </p>
      </div>
      
      {/* Botón de favorito en la parte inferior */}
      <button 
        onClick={() => toggleFavorito(personaje)}
        className={`mt-auto py-2 px-4 rounded font-bold transition-colors w-full ${
          esFavorito 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
        }`}
      >
        {esFavorito ? 'Quitar Favorito' : 'Agregar Favorito'}
      </button>
    </div>
  );
}

export default CharacterCard;
