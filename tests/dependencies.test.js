const assert = require('assert')

const { Container } = require('../src/samurai-inject')

const ServiceA = ({
  limit
}) => {
  const test = () => limit
  return {
    test
  }
}

const ServiceB = ({
  serviceA
}) => {
  const test = (factor) => serviceA.test() * factor
  return {
    test
  }
}

const ServiceC = ({
  serviceB,
  someNumber
}) => {
  const test = (factor) => serviceB.test(factor) * factor * someNumber
  return {
    test
  }
}

describe('params test', () => {
  it('Should register and get the instance with parameters', done => {
    const container = Container()
    container.register('serviceA', ServiceA, [
      { limit: 10 }
    ])
    container.register('serviceB', ServiceB, ['serviceA'])

    container.register('serviceC', ServiceC, ['serviceB',
      { someNumber: 1 }
    ])

    const serviceA = container.resolve('serviceA')

    assert(serviceA.test() === 10)

    const serviceB = container.resolve('serviceB')

    assert(serviceB.test(5) === 50)

    const serviceC = container.resolve('serviceC')

    assert(serviceC.test(5) === 250)

    done()
  })
})
