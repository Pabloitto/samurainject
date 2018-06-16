module.exports = ({
  userService
}) => {
  return {
    handler: (obj) => {
      return userService.createUser(obj)
    }
  }
}
