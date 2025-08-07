function createCache() {
  const cache = new Map();
  const maxAge = 5 * 60 * 1000;

  return {
    set(key, data) {
      cache.set(key, { data, timestamp: Date.now() });
    },
    get(key) {
      const item = cache.get(key);
      if (!item) return null;
      if (Date.now() - item.timestamp > maxAge) {
        cache.delete(key);
        return null;
      }
      return item.data;
    },
    clear() {
      cache.clear();
    },
  };
}

const cache = createCache();

export default cache;
