const { Map } = require("immutable-ext")

const Sum = x =>
({
  x,
  concat: ({x: y}) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`,
})

// monoid
// neutral element - does not change value - identity
Sum.empty = () => Sum(0)

//const res = Sum.empty().concat(Sum(1).concat(Sum(2)))

const All = x =>
({
  x,
  concat: ({x: y}) =>
    All(x && y),
  inspect: () =>
    `All(${x})`
})

// monoid
All.empty = () =>
  All(true)

//const res = All(true).concat(All(true)).concat(All.empty())

const First = x =>
({
  x,
  concat: _ =>
    First(x),
  inspect: () =>
    `First(${x})`
})

// no way to define a neutral element for First
// will remain a semigroup for now

const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0)

const all = xs =>
  xs.reduce((acc, x) => acc && x, true)

const first = xs =>
  xs.reduce((acc, xs) => acc)

const res =   

console.log(res)
