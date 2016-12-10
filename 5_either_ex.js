// several examples of imperative code vs code using either
// these will not run -- only partial code

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

const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}

const fromNullable = x =>
  x != null ? Right(x) : Left(null)


// ***** ----- ***** ----- ***** ----- ***** -----

const openSite = () => {
  if (current_user) {
    return renderPage(current_user)
  } else {
    return showLogin()
  }
}

const openSite = () =>
  fromNullable(current_user)
  .fold(showLogin, renderPage)

// ***** ----- ***** ----- ***** ----- ***** -----

// mock code i wrote to test this one
// const user = {};
// user.premium = false;
// user.preferences = 'custom prefs'
// const defaultPrefs = 'default prefs'
// const loadPrefs = prefs => `loading prefs: ${prefs}`

const getPrefs = user => {
  if (user.premium) {
    return loadPrefs(user.preferences)
  } else {
    return defaultPrefs
  }
}

const getPrefs = user =>
  (user.premium ? Right(user) : Left('not premium'))
  .map(u => u.preferences)
  .fold(() => defaultPrefs, prefs => loadPrefs(prefs))

// ***** ----- ***** ----- ***** ----- ***** -----

const streetName = user => {
  const address = user.address

  if (address) {
    const street = address.street

    if (street) {
      return street.name
    }
  }
  return 'no street'
}

const streetName = user =>
  fromNullable(user.address)
  .chain(a => fromNullable(a.street))
  .map(s => s.name)
  .fold(e => 'no street', n => n)

// ***** ----- ***** ----- ***** ----- ***** -----

const concatUniq = (x, ys) => {
  const found = ys.filter(y => y === x)[0]
  return found ? ys : ys.concat(x)
}

const concatUniq = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0])
  .fold(() => ys.concat(x), y => ys)

// ***** ----- ***** ----- ***** ----- ***** -----

const wrapExamples = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath)
    } catch (e) ()
  }
  return example
}

const readFile = x => tryCatch(() => fs.readFileSync(x))

const wrapExample = example =>
  fromNullable(example.previewPath)
  .chain(readFile)
  .fold(() => example,
        ex -> Object.assign(preview: p), ex))

// ***** ----- ***** ----- ***** ----- ***** -----

// commenting out this one because symbols for url match are messing up syntax
// highlighting (probably a typo)

// const parseDblUrl = cfg => {
//   try {
//     const c = JSON.parse(cfg)
//     if(c.url) {
//       return c.url.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+:(\d+)\/(.+)/))
//     }
//   } catch(e) {
//     return null
//   }
// }
//
// const parseDblUrl = cfg =>
//   tryCatch(() => JSON.parse(cfg))
//   .chain(c => fromNullable(c.url))
//   .fold(e => null,
//         u => u.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+:(\d+)\/(.+)/)))
