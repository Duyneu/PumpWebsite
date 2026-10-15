/**
 * Simple cache utility for API responses
 * Stores data in localStorage with expiration time
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

const CACHE_PREFIX = 'voltor_cache_';

export const cache = {
  /**
   * Set data in cache with TTL
   * @param key Cache key
   * @param data Data to cache
   * @param ttl Time to live in seconds (default: 5 minutes)
   */
  set<T>(key: string, data: T, ttl: number = 300): void {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl: ttl * 1000, // Convert to milliseconds
      };
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('Cache set failed:', error);
    }
  },

  /**
   * Get data from cache if not expired
   * @param key Cache key
   * @returns Cached data or null if expired/not found
   */
  get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(CACHE_PREFIX + key);
      if (!cached) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cached);
      const now = Date.now();

      // Check if expired
      if (now - cacheItem.timestamp > cacheItem.ttl) {
        this.remove(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.warn('Cache get failed:', error);
      return null;
    }
  },

  /**
   * Remove specific cache item
   * @param key Cache key
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(CACHE_PREFIX + key);
    } catch (error) {
      console.warn('Cache remove failed:', error);
    }
  },

  /**
   * Clear all cache items
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  },

  /**
   * Clear expired cache items
   */
  clearExpired(): void {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();

      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          try {
            const cached = localStorage.getItem(key);
            if (cached) {
              const cacheItem: CacheItem<any> = JSON.parse(cached);
              if (now - cacheItem.timestamp > cacheItem.ttl) {
                localStorage.removeItem(key);
              }
            }
          } catch (e) {
            // Skip invalid items
          }
        }
      });
    } catch (error) {
      console.warn('Cache clearExpired failed:', error);
    }
  },
};

// Clear expired cache on app load
cache.clearExpired();
