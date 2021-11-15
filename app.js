/**
 * You can use Obejct.create() to create a new object.
 *
 * Implement your own `objectCreate()` to do the same.
 *
 * You don't need to support propertiesObject (2nd parameter of Object.create())
 * Throw an error if non-object is passed in.
 * Object.create() and Object.setProtoypeOf() should not be used.
 *
 * @param {object} proto
 * @return {object}
 */
function objectCreate(proto) {
  if (proto === null) {
    throw new Error("proto cannot be null");
  }
  if (proto === undefined) {
    throw new Error("proto cannot be undefined");
  }
  if (proto !== Object(proto)) {
    throw new Error(
      `proto expected to be an object but recived ${typeof proto}`
    );
  }
  function Fn() {}
  Fn.prototype = proto.prototype || proto;
  return new Fn();
}

module.exports = objectCreate;
