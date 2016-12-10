const Left = x =>
({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const Right = x =>
({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const fromNullable = x =>
  x != null ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}

const fs = require('fs')

// to refactor
// const getPort = () => {
//   try {
//     const str = fs.readFileSync('config.json')
//     const config = JSON.parse(str)
//     return config.port
//   } catch(e) {
//     return 3000
//   }
// }

// missing a try/catch for parse
// const getPort = () =>
//   tryCatch(() => fs.readFileSync('config.json'))
//   .map(c => JSON.parse(c))
//   .fold(e => 3000,
//         c => c.port)

// using chain
const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json')) // Right('')
  .chain(c => tryCatch(() => JSON.parse(c))) // Right('')
  .fold(e => 3000,
        c => c.port)

const result = getPort()

console.log(result)
