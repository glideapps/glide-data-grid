import { LRUCache } from './LRUCache';

describe('LRUCache', () => {
  let cache: LRUCache<string, string>;

  beforeEach(() => {
    cache = new LRUCache<string, string>(2);
  });

  it('should store and retrieve values correctly', () => {
    cache.put('key1', 'value1');
    cache.put('key2', 'value2');

    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key2')).toBe('value2');
  });

  it('should return undefined for non-existing keys', () => {
    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBeUndefined();
  });

  it('should evict the least recently used key when capacity is reached', () => {
    cache.put('key1', 'value1');
    cache.put('key2', 'value2');
    cache.put('key3', 'value3');

    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBe('value2');
    expect(cache.get('key3')).toBe('value3');
  });

  it('should update the value when a key is re-inserted', () => {
    cache.put('key1', 'value1');
    cache.put('key2', 'value2');
    cache.put('key1', 'newvalue');

    expect(cache.get('key1')).toBe('newvalue');
  });
});
