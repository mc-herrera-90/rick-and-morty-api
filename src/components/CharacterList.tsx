import React, { useState } from 'react';
import useRickAndMortyAPI from '../hooks/useRickAndMortyAPI';

const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { characters, loading, error } = useRickAndMortyAPI(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page <= 1}>
          Anterior
        </button>
        <button onClick={handleNextPage}>
          Siguiente
        </button>
      </div>
      <div className="character-list">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>{character.species}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;