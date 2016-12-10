const { Map } = require("immutable-ext")

// semi group is string in this case -- we can keep calling concat
// const res = "a".concat("b");

// semi group is array in this case
// semigroups come from abstract algebra
// so we know we can use the rules that apply (associativity for ex)

// const res = [1,2].concat([3, 4,].concat([5, 6]))

// creating a Sum semigroup
const Sum = x =>
({
  x,
  concat: ({x: y}) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`,
})

// const res = Sum(1).concat(Sum(2))

// true && false > false
// true && true > true

const All = x =>
({
  x,
  concat: ({x: y}) =>
    All(x && y),
  inspect: () =>
    `All(${x})`
})

const First = x =>
({
  x,
  concat: _ =>
    First(x),
  inspect: () =>
    `First(${x})`
})


//const res = All(true).concat(All(true))
//const res = First('blah').concat(First('ice cream'))
//            .concat(First('meta programming'))

const acct1 = Map({ name: First('Nico'), isPaid: All(true),
                points: Sum(10), friends: ['Franklin'] })

const acct2 = Map({ name: First('Nico'), isPaid: All(false),
                points: Sum(2), friends: ['Gatsby'] })

const res = acct1.concat(acct2);



console.log(res.toJS());
