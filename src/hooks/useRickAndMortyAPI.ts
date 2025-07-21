import { useState, useEffect } from 'react';
import axios from 'axios';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
}

interface ApiResponse {
  results: Character[];
  info: {
    next: string | null;
  };
}

const useRickAndMortyAPI = (url: string) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>(url);
        setCharacters(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [url]);

  return { characters, loading, error };
};

export default useRickAndMortyAPI;