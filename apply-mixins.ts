function applyMixins(derived, bases) {
  bases.forEach((base) => {
    Object.getOwnPropertyNames(base.prototype)
      .filter((propertyName) => propertyName.toLowerCase() !== 'constructor')
      .forEach((property) => {
        derived.prototype[property] = base.prototype[property];
      });
  });
}
