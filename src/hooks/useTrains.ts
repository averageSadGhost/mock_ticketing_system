import { useState, useCallback } from 'react';
import { Train, SearchParams } from '../types';
import { searchTrains, stations } from '../services/mockData';

interface UseTrainsResult {
  trains: Train[];
  isLoading: boolean;
  error: string | null;
  search: (params: SearchParams) => Promise<Train[]>;
  getStations: () => typeof stations;
}

export function useTrains(): UseTrainsResult {
  const [trains, setTrains] = useState<Train[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (params: SearchParams): Promise<Train[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const results = searchTrains(params.origin, params.destination, params.date);

      if (results.length === 0) {
        setError('No trains found for this route. Try a different route or date.');
      }

      setTrains(results);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setTrains([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStations = useCallback(() => stations, []);

  return {
    trains,
    isLoading,
    error,
    search,
    getStations,
  };
}
