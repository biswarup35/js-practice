const objectCreate = require("./app");

describe("objectCreate should", () => {
  it("throw an error when proto is null or undefined", () => {
    expect(() => {
      objectCreate(null);
    }).toThrowError(/null/);
    expect(() => {
      objectCreate(undefined);
    }).toThrowError(/undefined/);
  });
  it("throw an error when proto is not an object", () => {
    expect(() => {
      objectCreate(true);
    }).toThrowError(/boolean/);
    expect(() => {
      objectCreate(1);
    }).toThrowError(/number/);
  });
  it("create a new object", () => {
    const proto = {};
    const obj = objectCreate(proto);
    expect(Object.getPrototypeOf(obj)).toBe(proto);
  });
});
