const objectAssign = require("./app");

describe("ObjectAssign should", () => {
  it("{a:3,b:4}", () => {
    expect(objectAssign({}, { a: 3 }, { b: 4 })).toEqual(
      Object.assign({}, { a: 3 }, { b: 4 })
    );
  });
  it("not create a new object", () => {
    const target = {};
    expect(objectAssign(target, { a: 3 }, { b: 4 })).toBe(target);
  });
  it("only asssign enumerable properties", () => {
    const target = {};
    const b = Object.create(
      { a: 3 },
      {
        b: {
          value: 4,
        },
        c: {
          value: 5,
          enumerable: true,
        },
      }
    );
    expect(objectAssign(target, b)).toEqual({ c: 5 });
  });
  it("throw an error when target is null or undefined", () => {
    expect(() => {
      objectAssign(null);
    }).toThrowError(/null/);

    expect(() => {
      objectAssign(undefined);
    }).toThrowError(/undefined/);
  });
  it("support symbols", () => {
    const key = Symbol("key");
    const a = {
      [key]: 3,
      b: 4,
    };
    const target = {};
    objectAssign(target, a);
    expect(target[key]).toBe(3);
    expect(target.b).toBe(4);
  });
  it("non-string primitive source are ignored expect {a:3}", () => {
    expect(
      objectAssign({}, { a: 3 }, null, undefined, NaN, 1, true, 1n)
    ).toEqual({ a: 3 });
  });
  it("string in source have enumerable properties like`abc`", () => {
    expect(objectAssign({}, "abc")).toEqual(Object.assign({}, "abc"));
  });
  it("numbers in target are wrapped", () => {
    const num = 3;
    const obj = objectAssign(num, { a: 3 });
    expect(obj).toEqual(Object.assign(num, { a: 3 }));
    expect(obj).not.toBe(num);
  });
  it("booleans in target are wrapped", () => {
    const bool = true;
    const obj = objectAssign(bool, { a: 3 });
    expect(obj).toEqual(Object.assign(bool, { a: 3 }));
    expect(obj).not.toBe(bool);
  });
  it("string in target are wrapped", () => {
    const str = "3";
    const obj = objectAssign(str, { a: 3 });
    expect(obj).toEqual(Object.assign(str, { a: 3 }));
    expect(obj).not.toBe(str);
  });
  it("exceptions interrupt the ongoing copying task", () => {
    const target = Object.defineProperty({}, "foo", {
      value: 1,
      writable: false,
    });
    expect(() => {
      objectAssign(
        target,
        { bar: 2 },
        { foo2: 3, foo: 3, foo3: 3 },
        { baz: 4 }
      );
    }).toThrowError(/read-only/);
    expect(target).toEqual({ bar: 2, foo2: 3 });
  });
  it("getter in source are triggered", () => {
    const a = {
      get b() {
        return 3;
      },
    };
    expect(objectAssign({}, a)).toEqual(Object.assign({}, a));
  });
  it("enumerable properties in non-primitve source are assigned", () => {
    const func = () => {};
    func.a = 3;
    expect(objectAssign({}, func)).toEqual(Object.assign({}, func));
  });
});
