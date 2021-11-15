/**
 * The Object.assign() method copies all enumerable
 *  own properties from one or more source objects
 * to a target object. It returns the target object.
 *
 *  It is widely used, object spread operator actually is
 *  inernally the same as the Obejct.assign()
 *
 *
 *      let a = {}
 *      let aClone = {...a}
 *
 * @param {object} target
 * @param {object[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  if (arguments[0] === null) {
    throw new Error("target cannot be null");
  } else if (arguments[0] === undefined) {
    throw new Error("target cannot be undefined");
  }

  for (const objects of sources) {
    for (const key in objects) {
      let symbols = Object.getOwnPropertySymbols(objects);
      for (const symbol of symbols) {
        target[symbol] = objects[symbol];
      }

      if (objects.hasOwnProperty.call(objects, key)) {
        if (target !== Object(target)) {
          target = Object(target);
        }
        if (Object.getOwnPropertyDescriptor(target, key)) {
          if (Object.getOwnPropertyDescriptor(target, key).writable === false) {
            throw new Error("read-only");
          }
        }
        target[key] = objects[key];
      }
    }
  }
  return target;
}

module.exports = objectAssign;
