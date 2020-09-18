export default function Cache() {
  let _cache = {}
  
  function get(id=null) {
    if (id == null) {
      return Object.values(_cache);
    }

    return _cache[id];
  }
  
  function set(key, value = undefined) {
    if (Array.isArray(key) && value === undefined) {
      for (let item in key) {
        _cache[item._id] = key[item]
      }
      return
    }

    if (!!key && !!value) {
      _cache[key] = value;
      return
    }

    throw Error('Either supply an array of items with _id or provide both key and value for one item');
  }

  function has(key) {
    return key in _cache;
  }

  return {
    get,
    set,
    has,
  }
}
