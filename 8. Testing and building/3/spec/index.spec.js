const { sum, dif, multip, div } = require("../index.js");

describe("Функция sum()", () => {
  it("должна возвращать 5 при a=5 и b=0", () => {
    expect(sum(5, 0)).toBe(5);
  });
  it("должна возвращать 7 при a=2 и b=5", () => {
    expect(sum(2, 5)).toBe(7);
  });
  it("должна возвращать 'Неверно введены числа' при a='' или b=''", () => {
    expect(sum("rt", 5)).toBe("Неверно введены числа");
    expect(sum(5, "ertygf")).toBe("Неверно введены числа");
  });
  it("должна возвращать 'Неверно введены числа' при a=null или b=null", () => {
    expect(sum(null, 5)).toBe("Неверно введены числа");
    expect(sum(5, null)).toBe("Неверно введены числа");
  });
  it("должна возвращать 'Неверно введены числа' при a=undefined или b=undefined", () => {
    expect(sum(undefined, 5)).toBe("Неверно введены числа");
    expect(sum(5, undefined)).toBe("Неверно введены числа");
  });
});

describe("Функция dif()", () => {
  it("должна возвращать 4 при a=5 и b=1", () => {
    expect(dif(5, 1)).toBe(4);
  });
  it("должна возвращать -3 при a=2 и b=5", () => {
    expect(dif(2, 5)).toBe(-3);
  });
  it("должна возвращать 'Неверно введены числа' при a='' или b=''", () => {
    expect(dif("rt", 5)).toBe("Неверно введены числа");
    expect(dif(5, "ertygf")).toBe("Неверно введены числа");
  });
  it("должна возвращать 'Неверно введены числа' при a=null или b=null", () => {
    expect(dif(null, 5)).toBe("Неверно введены числа");
    expect(dif(5, null)).toBe("Неверно введены числа");
  });
  it("должна возвращать 'Неверно введены числа' при a=undefined или b=undefined", () => {
    expect(dif(undefined, 5)).toBe("Неверно введены числа");
    expect(dif(5, undefined)).toBe("Неверно введены числа");
  });
});

describe("Функция multip()", () => {
  it("должна возвращать 0 при a=5 и b=0", () => {
    expect(multip(5, 0)).toBe(0);
  });
  it("должна возвращать 19 при a=2 и b=5", () => {
    expect(multip(2, 5)).toBe(10);
  });
  it("должна возвращать 'Неверно введены числа' при a='' или b=''", () => {
    expect(multip("rt", 5)).toBe("Неверно введены числа");
    expect(multip(5, "ertygf")).toBe("Неверно введены числа");
  });
  it("должна возвращать 'Неверно введены числа' при a=null или b=null", () => {
    expect(multip(null, 5)).toBe("Неверно введены числа");
    expect(multip(5, null)).toBe("Неверно введены числа");
  });
  it("должна возвращать 'Неверно введены числа' при a=undefined или b=undefined", () => {
    expect(multip(undefined, 5)).toBe("Неверно введены числа");
    expect(multip(5, undefined)).toBe("Неверно введены числа");
  });
});

describe("Функция div()", () => {
  it("должна возвращать 'На ноль делить нельзя' при a=5 и b=0", () => {
    expect(div(5, 0)).toBe("На ноль делить нельзя");
  });
  it("должна возвращать 33 при a=99 и b=3", () => {
    expect(div(99, 3)).toBe(33);
  });
  it("должна возвращать 0.4 при a=2 и b=5", () => {
    expect(div(2, 5)).toBe(0.4);
  });
  it("должна возвращать 'Неверно введены числа' при a='' или b=''", () => {
    expect(div("rt", 5)).toBe("Неверно введены числа");
    expect(div(5, "ertygf")).toBe("Неверно введены числа");
  });
  it("должна возвращать 'Неверно введены числа' при a=null или b=null", () => {
    expect(div(null, 5)).toBe("Неверно введены числа");
    expect(div(5, null)).toBe("Неверно введены числа");
  });
  it("должна возвращать 'Неверно введены числа' при a=undefined или b=undefined", () => {
    expect(div(undefined, 5)).toBe("Неверно введены числа");
    expect(div(5, undefined)).toBe("Неверно введены числа");
  });
});
