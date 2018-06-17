# Samurai Inject

A Simple IOC Container

[![Coverage Status](https://coveralls.io/repos/github/Pabloitto/samurainject/badge.svg?branch=master)](https://coveralls.io/github/Pabloitto/samurainject?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Pabloitto/samurainject/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/Pabloitto/samurainject.svg?branch=master)](https://travis-ci.org/Pabloitto/samurainject)

**Installation**

Install with `npm`
```
npm install samurai-inject --save
```

**How to use**
```javascript
/*
* Get container factory function
*/
const { Container } =  require('samurai-inject')

// Create the instance of the container
const  container  =  Container() 

class Foo {
  print () {
   console.log('Foo')
  }
}

class Bar {
  print () {
   console.log('Bar')
  }
}

// We can register classes or functions
container.register('foo', Foo)
container.register('bar', Bar)

// And then we can resolve those classes and get the instances
const foo = container.resolve('foo')
const bar = container.resolve('bar')

foo.print() // Output: Foo
bar.print() // Output: Bar
```

**Class vs Factories**

We can use classes or factories patterns

```javascript
const { Container } =  require('samurai-inject')
const  container  =  Container() 

const Baz = () => {
  const print = () => {
    console.log('Baz')
  }
  return {
    print
  }
}

class Qux {
  print () {
   console.log('Qux')
  }
}

// We can register classes or functions
container.register('qux', Qux)
container.register('Baz', Baz)

// And then we can resolve those classes and get the instances
const qux = container.resolve('qux')
const baz = container.resolve('baz')

qux.print() // Output: Qux
baz.print() // Output: Baz
```

**Resolve parameters as dependencies (default behavior)**

The default behavior to solve the parameters which are other objects is passing the data as a single parameter object.

```javascript
const { Container } =  require('samurai-inject')
const  container  =  Container() 

class Corge {
  // The default behavior pass an object to the constructor
  // So we can destructure the object and get the param than we want
  constructor ({
    grault
  }) {
    this.grault = grault
  }
  print () {
    console.log('Corge')
    this.grault.print()
  }
}

class Grault {
  print () {
    console.log('Grault')
  }
}

// We can register classes or functions
// In this case we specify the dependencies in the third parameter
container.register('corge', Corge, ['grault'])
container.register('grault', Grault)

// And then we can resolve those classes and get the instances
const corge = container.resolve('corge')
const grault = container.resolve('grault')

corge.print() // Output: Corge Grault
grault.print() // Output: Grault
```
**Resolve parameters individually**

 We can override the default behavior to solve the parameters one by one sending it separately as a classical pattern used by the begin of the times.

```javascript
const { Container, PARAMS_MODE } =  require('samurai-inject')
const  container  =  Container() 

class Garply {
  constructor (waldo) {
    this.waldo = waldo
  }
  print () {
    console.log('Garply')
    this.waldo.print()
  }
}
class Waldo {
  print () {
    console.log('Waldo')
  }
}

// We can register classes or functions
// In this case we specify the dependencies in the third parameter
// In this case we specify that the parameter are gonna pass it individually
container.register('garply', Garply, ['waldo'], PARAMS_MODE.asIndividualParams)
container.register('waldo', Waldo)

// And then we can resolve those classes and get the instances
const garply = container.resolve('garply')
const waldo = container.resolve('waldo')

garply.print() // Output: Garply Waldo
waldo.print() // Output: Waldo
```

**Static params**

Sometimes we want to pass some fixed/static parameters to our objects like a connection strings or something like that.

```javascript
const { Container } =  require('samurai-inject')
const  container  =  Container() 

class Fred {
  constructor ({
    plugh,
    connectionString
  }) {
    this.plugh = plugh
    this.connectionString = connectionString
  }
  connect () {
    console.log('Connection to ' + this.connectionString)
    console.log('Limit of rows is ' + this.plugh.getLimitOfRows)
  }
}
class Plugh {
  constructor ({
    limitOfRows
  }){
    this.limitOfRows = limitOfRows
  }
  getLimitOfRows () {
    return this.limitsOfRows
  }
}

// We can register classes or functions
// In this case we specify the dependencies in the third parameter
// In this case we can specify the static parameter using an object instead an string
container.register('fred', Fred, ['plugh',
  { connectionString: 'mongo:mylocalmongo:2727/testdb' }
])
container.register('plugh', Plugh, [
  { limitsOfRows: 100 }
])

// And then we can resolve those classes and get the instances
const fred = container.resolve('fred')
const plugh = container.resolve('plugh')

fred.print() 
// Output: Connection to mongo:mylocalmongo:2727/testdb
// Output: Limit of rows is 100
plugh.getLimitOfRows() // Output: 100
```
