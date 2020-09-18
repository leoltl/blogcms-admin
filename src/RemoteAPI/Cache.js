export default function Cache() {
  let _cache = {}
  
  function get(id=null) {
    if (id === null) {
      return Object.values(_cache);
    }

    return _cache[id];
  }
  
  function set(key, value=undefined) {
    if (!!key && !!value) {
      _cache[key] = value;
      return
    }
  }

  function setArray(items) {
    for (let item of items) {
      console.log(item)
      _cache[item._id] = item
    }
  }

  function has(key) {
    return key in _cache;
  }
  
  function isEmpty() {
    return Object.keys(_cache).length === 0;
  }

  return {
    get,
    set,
    setArray,
    has,
    isEmpty,
  }
}
