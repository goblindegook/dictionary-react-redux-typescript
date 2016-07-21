import serialize = require("serialize-javascript");

export default function memoize(fn: (...args: any[]) => any): (...args: any[]) => any {
  const cache = {};
  return function(...args) {
    const key = serialize(args);
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    } else {
      cache[key] = fn(...args);
      return cache[key];
    }
  };
}
