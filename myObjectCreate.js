/**
 * * You can use Object.craete() to create new object.
 * Can you write your owwn `myObjectCreate()` to do the same?
 * - You don't need to support propertiesObject (2nd parameter of the Obejct.create())
 * - Throw an error if non-obejct is passed in.
 * - Object.create() and Obejct.setPrototypeOf() should not be used.
 */

/**
 * @param {object} proto
 * @return {object}
 */
function myObjectCreate(proto) {
  try {
    if (proto === Object(proto) && proto !== null && proto !== undefined) {
      function Fn() {}
      Fn.prototype = proto.prototype || proto;
      return new Fn();
    } else {
      throw new Error(
        `Expected an object but recevied ${
          proto === null ? "null" : typeof proto
        }`
      );
    }
  } catch (error) {
    console.log(error);
  }
}
