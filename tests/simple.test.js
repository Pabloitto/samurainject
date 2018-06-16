const assert = require('assert')

const { Container } = require('../src/samuraiject')

class A {
  test () {
    return 1
  }
}

describe('simple test', () => {
  it('Should register and get the instance', done => {
    const container = Container()
    container.register('a', A)
    const classA = container.resolve('a')
    assert(classA.test() === 1)
    done()
  })
})
