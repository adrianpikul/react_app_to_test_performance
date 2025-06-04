// Type helper to extract key-value pairs from an object type
type KeyValuePair<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T];

// Type for entries array
type TypedEntries<T> = KeyValuePair<T>[];

// More flexible input type that handles the complex nesting in user4
type TypedMapInput<T> = 
  | TypedEntries<T> 
  | TypedMap<T> 
  | (TypedMap<T> | TypedEntries<T> | KeyValuePair<T>)[];

class TypedMap<T extends Record<string | number | symbol, any>> implements Iterable<KeyValuePair<T>> {
  private data: Map<keyof T, T[keyof T]>;

  constructor(input?: TypedMapInput<T>) {
    this.data = new Map();
    
    if (input) {
      this.addInput(input);
    }
  }

  private addInput(input: TypedMapInput<T>): void {
    if (Array.isArray(input)) {
      // Handle array that can contain TypedMaps, entries arrays, or individual entries
      for (const item of input) {
        if (item instanceof TypedMap) {
          // Spread another TypedMap
          for (const [key, value] of item.entries()) {
            this.data.set(key, value);
          }
        } else if (Array.isArray(item)) {
          // Check if it's a single key-value pair or array of entries
          if (item.length === 2 && !Array.isArray(item[0])) {
            // Single key-value pair
            const [key, value] = item as KeyValuePair<T>;
            this.data.set(key, value);
          } else {
            // Array of entries
            for (const entry of item as TypedEntries<T>) {
              const [key, value] = entry;
              this.data.set(key, value);
            }
          }
        }
      }
    } else if (input instanceof TypedMap) {
      // Spread another TypedMap
      for (const [key, value] of input.entries()) {
        this.data.set(key, value);
      }
    } else {
      // Handle direct entries array
      for (const [key, value] of input) {
        this.data.set(key, value);
      }
    }
  }

  // Set a key-value pair with type checking
  set<K extends keyof T>(key: K, value: T[K]): this {
    this.data.set(key, value);
    return this;
  }

  // Get a value by key with proper typing
  get<K extends keyof T>(key: K): T[K] | undefined {
    return this.data.get(key) as T[K] | undefined;
  }

  // Check if a key exists
  has<K extends keyof T>(key: K): boolean {
    return this.data.has(key);
  }

  // Delete a key
  delete<K extends keyof T>(key: K): boolean {
    return this.data.delete(key);
  }

  // Clear all entries
  clear(): void {
    this.data.clear();
  }

  // Get the size
  get size(): number {
    return this.data.size;
  }

  // Iterator methods
  keys(): IterableIterator<keyof T> {
    return this.data.keys();
  }

  values(): IterableIterator<T[keyof T]> {
    return this.data.values();
  }

  entries(): IterableIterator<KeyValuePair<T>> {
    return this.data.entries() as IterableIterator<KeyValuePair<T>>;
  }

  // Make it iterable
  [Symbol.iterator](): IterableIterator<KeyValuePair<T>> {
    return this.entries();
  }

  // Convert to plain object
  toObject(): Partial<T> {
    const obj: Partial<T> = {};
    for (const [key, value] of this.data) {
      (obj as any)[key] = value;
    }
    return obj;
  }

  // Create a new TypedMap with merged data
  merge(...others: (TypedMap<T> | TypedEntries<T>)[]): TypedMap<T> {
    const newMap = new TypedMap<T>();
    
    // Copy current data
    for (const [key, value] of this.entries()) {
      newMap.set(key, value);
    }
    
    // Merge others
    for (const other of others) {
      if (other instanceof TypedMap) {
        for (const [key, value] of other.entries()) {
          newMap.set(key, value);
        }
      } else {
        for (const [key, value] of other) {
          newMap.set(key, value);
        }
      }
    }
    
    return newMap;
  }
}

// Helper function to create typed entries more easily
function createTypedEntries<T>(...entries: KeyValuePair<T>[]): TypedEntries<T> {
  return entries;
}

// Example usage:
type User = {
  userId: string;
  age: number;
  preferences: string[];
};

// Test the implementation
const user1 = new TypedMap<User>();

const user2 = new TypedMap<User>([
  ['userId', 'abc']
]);

const user3 = new TypedMap<User>([
  ['userId', 'abcd'],
  ['age', 2],
]);

// Fixed user4 - using the helper function for clarity
const user4 = new TypedMap<User>([
  ...user3,
  ...user2,
  ...createTypedEntries<User>(
    ['preferences', ['a1', 'a2']],
    ['age', 5]
  )
]);

// Alternative syntax that should also work
const user4Alt = new TypedMap<User>([
  user3,
  user2,
  [['preferences', ['a1', 'a2']], ['age', 5]]
]);

// Additional methods for testing
console.log('user2 userId:', user2.get('userId')); // 'abc'
console.log('user3 age:', user3.get('age')); // 2
console.log('user4 preferences:', user4.get('preferences')); // ['a1', 'a2']
console.log('user4 age:', user4.get('age')); // 5

// Type-safe operations
user1.set('userId', '123'); // ✓ Valid
user1.set('age', 25); // ✓ Valid
user1.set('preferences', ['reading', 'coding']); // ✓ Valid

// These would cause TypeScript errors:
// user1.set('userId', 123); // ✗ Error: number not assignable to string
// user1.set('age', 'twenty'); // ✗ Error: string not assignable to number
// user1.set('preferences', 'reading'); // ✗ Error: string not assignable to string[]
