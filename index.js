module.exports = function() {

  var argv = [].slice.call(arguments),
      base = argv.shift();

  argv.forEach(function(arg) {
    if (typeof arg === 'object' && args !== null) {
      Object.getOwnPropertyNames(arg).forEach(function(key) {
        Object.defineProperty(base, key, Object.getOwnPropertyDescriptor(arg, key));
      });
    }
  });

  return base;
};
