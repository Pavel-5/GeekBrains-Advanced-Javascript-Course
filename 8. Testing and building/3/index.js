function sum(a, b) {
  return typeof a === "number" && typeof b === "number"
    ? a + b
    : "Неверно введены числа";
}

function dif(a, b) {
  return typeof a === "number" && typeof b === "number"
    ? a - b
    : "Неверно введены числа";
}

function multip(a, b) {
  return typeof a === "number" && typeof b === "number"
    ? a * b
    : "Неверно введены числа";
}

function div(a, b) {
  if (b === 0) return "На ноль делить нельзя";
  return typeof a === "number" && typeof b === "number"
    ? a / b
    : "Неверно введены числа";
}

module.exports = {
  sum,
  dif,
  multip,
  div,
};
