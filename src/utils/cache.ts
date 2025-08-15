import { Cache, CacheItem } from '../types';

function createCache(): Cache {
  const cache = new Map<string, CacheItem<any>>();
  const maxAge = 5 * 60 * 1000;

  return {
    set<T>(key: string, data: T): void {
      cache.set(key, { data, timestamp: Date.now() });
    },
    get<T>(key: string): T | null {
      const item = cache.get(key);
      if (!item) return null;
      if (Date.now() - item.timestamp > maxAge) {
        cache.delete(key);
        return null;
      }
      return item.data;
    },
    clear(): void {
      cache.clear();
    },
  };
}

const cache = createCache();

export default cache;
