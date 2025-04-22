/**
 * This module provides a simple in-memory caching mechanism.
 * 
 * Why:
 * - To temporarily store data in memory for quick access, reducing the need for repeated API calls or computations.
 * - Useful for improving performance and minimizing redundant operations.
 * 
 * How:
 * - `getCachedData(key)`: Retrieves data from the cache using a unique key.
 * - `setCacheData(key, data)`: Stores data in the cache with a unique key.
 */

const cache = {};

/**
 * Retrieves data from the cache.
 * @param {string} key - The unique key for the cached data.
 * @returns {*} The cached data, or undefined if the key does not exist.
 */
export const getCachedData = (key) => cache[key];

/**
 * Stores data in the cache.
 * @param {string} key - The unique key for the data to be cached.
 * @param {*} data - The data to store in the cache.
 */
export const setCacheData = (key, data) => {
  cache[key] = data;
};