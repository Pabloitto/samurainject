const { Container } = require('../../samurai-inject')

const container = Container()

const { UserService } = require('./users/user.service')
const UserModel = require('./users/user.model')

container.register('userService', UserService, [
  { userModel: UserModel }
])

container.register('userFetchRoute', require('./users/user.fetch.route'), ['userService'])
container.register('userCreateRoute', require('./users/user.create.route'), ['userService'])

const userCreateRoute = container.resolve('userCreateRoute')

userCreateRoute.handler({
  name: 'Test1',
  email: 'test@test.com'
})

const userFetchRoute = container.resolve('userFetchRoute')

console.log(userFetchRoute.handler())
