function applyMixins(derived, bases) {
  bases.forEach((base) => {
    Object.getOwnPropertyNames(base.prototype)
      .filter((name) => name.toLowerCase() !== 'constructor')
      .forEach((name) => {
        derived.prototype[name] = base.prototype[name];
      });
  });
}
