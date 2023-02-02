import LRUCache from 'lru-native2';

export const cache = new LRUCache({
	maxElements: 10000,
	maxAge: 60000,
	size: 1000,
	maxLoadFactor: 2
});
