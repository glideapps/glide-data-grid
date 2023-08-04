export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<K, V>();
  }

  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      const value = this.cache.get(key)!;
      this.cache.delete(key);
      this.cache.set(key, value); // Move the key to the end to mark it as most recently used
      return value;
    }
    return undefined; // If key is not present in the cache
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key); // Delete existing key to insert it as most recently used
    } else if (this.cache.size >= this.capacity) {
      // If cache is full, delete the least recently used key (first entry in the Map)
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value); // Add the key-value pair to the cache
  }
}
