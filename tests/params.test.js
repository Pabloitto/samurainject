const assert = require('assert')

const { Container, PARAMS_MODE } = require('../src/samurai-inject')

class A {
  constructor (numberOne) {
    this.numberOne = numberOne
  }
  sum (num) {
    return this.numberOne + num
  }
}

class B {
  constructor (config) {
    this.numberOne = config.numberOne
  }
  sum (num) {
    return this.numberOne + num
  }
}

const FactoryA = ({
  factor
}) => {
  const multiply = (n) => {
    return n * factor
  }
  return {
    multiply
  }
}

const FactoryB = (factor) => {
  const multiply = (n) => {
    return n * factor
  }
  return {
    multiply
  }
}

describe('params test', () => {
  it('Should register and get the instance with parameters', done => {
    const container = Container()
    container.register('a', A, [
      { numberOne: 5 }
    ], PARAMS_MODE.asIndividualParams)
    const classA = container.resolve('a')
    assert(classA.sum(5) === 10)
    done()
  })
  it('Should register and get the instance with parameters as config', done => {
    const container = Container()
    container.register('b', B, [
      { numberOne: 10 }
    ])
    const classB = container.resolve('b')
    assert(classB.sum(10) === 20)
    done()
  })
  it('Should register factory and get the instance with parameters', done => {
    const container = Container()
    container.register('factoryA', FactoryA, [
      { factor: 30 }
    ])
    const factoryA = container.resolve('factoryA')
    assert(factoryA.multiply(3) === 90)
    done()
  })
  it('Should register factory and get the instance with parameters as config', done => {
    const container = Container()
    container.register('factoryB', FactoryB, [
      { factor: 100 }
    ], PARAMS_MODE.asIndividualParams)
    const factoryB = container.resolve('factoryB')
    assert(factoryB.multiply(10) === 1000)
    done()
  })
})
