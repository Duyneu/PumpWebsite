import { useState, useEffect } from 'react';
import { cache } from '../utils/cache';

/**
 * Hook to use cached data with automatic cache management
 * @param key Cache key
 * @param fetcher Function to fetch data
 * @param ttl Time to live in seconds (default: 5 minutes)
 * @returns [data, loading, error, refetch]
 */
export function useCache<T>(
  key: string,
  fetcher: () => Promise<T> | T,
  ttl: number = 300
): [T | null, boolean, Error | null, () => void] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = cache.get<T>(key);
      if (cached !== null) {
        setData(cached);
        setLoading(false);
        return;
      }

      // Fetch fresh data
      const result = await Promise.resolve(fetcher());
      
      // Save to cache
      cache.set(key, result, ttl);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [key]);

  const refetch = () => {
    cache.remove(key);
    fetchData();
  };

  return [data, loading, error, refetch];
}
