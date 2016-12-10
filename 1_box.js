// V1
// const nextCharForNumberString = str => {
//   const trimmed = str.trim()
//   const number = parseInt(trimmed)
//   const nextNumber = number + 1
//   return String.fromCharCode(nextNumber)
// }

// v2
// const nextCharForNumberString = str =>
//   [str]
//   .map(s => s.trim())
//   .map(r => parseInt(r))
//   .map(i => i + 1)
//   .map(i => String.fromCharCode(i))

const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const nextCharForNumberString = str =>
  Box(str)
  .map(s => s.trim())
  .map(r => parseInt(r))
  .map(i => i + 1)
  .fold(i => String.fromCharCode(i))

const result = nextCharForNumberString('  64 ')

console.log(result);
