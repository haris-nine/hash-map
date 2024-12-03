class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    if (typeof initialCapacity !== 'number' || initialCapacity <= 0) {
      throw new Error('Initial capacity must be a positive number');
    }
    if (typeof loadFactor !== 'number' || loadFactor <= 0 || loadFactor > 1) {
      throw new Error('Load factor must be a number between 0 and 1');
    }

    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.size = 0;
    this.capacity = initialCapacity;
  }

  hash(key) {
    if (typeof key !== 'string') {
      throw new Error('Key must be a string');
    }

    let hashCode = 0;
    const primeNumber = 31;
    
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }

  resize() {
    const newCapacity = this.buckets.length * 2;
    const oldBuckets = this.buckets;

    this.buckets = new Array(newCapacity).fill(null).map(() => []);
    this.capacity = newCapacity;
    this.size = 0;

    oldBuckets.forEach(bucket => {
      bucket.forEach(([key, value]) => {
        this.set(key, value);
      });
    });
  }

  set(key, value) {
    if ((this.size + 1) / this.buckets.length > this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    for (const [storedKey, value] of bucket) {
      if (storedKey === key) {
        return value;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    return bucket.some(([storedKey]) => storedKey === key);
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const allKeys = [];
    this.buckets.forEach(bucket => {
      bucket.forEach(([key]) => {
        allKeys.push(key);
      });
    });
    return allKeys;
  }

  values() {
    const allValues = [];
    this.buckets.forEach(bucket => {
      bucket.forEach(([, value]) => {
        allValues.push(value);
      });
    });
    return allValues;
  }

  entries() {
    const allEntries = [];
    this.buckets.forEach(bucket => {
      bucket.forEach(entry => {
        allEntries.push(entry);
      });
    });
    return allEntries;
  }
}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log("Length before overwriting:", test.length()); 

test.set('apple', 'green');
test.set('banana', 'brown');
console.log("Length after overwriting:", test.length()); 

test.set('moon', 'silver');
console.log("Capacity after resizing:", test.buckets.length); 

console.log("Get 'moon':", test.get('moon')); 
console.log("Has 'elephant':", test.has('elephant'));
console.log("Remove 'dog':", test.remove('dog')); 
console.log("Length after removal:", test.length()); 

console.log("All Keys:", test.keys());
console.log("All Values:", test.values());
console.log("All Entries:", test.entries());

