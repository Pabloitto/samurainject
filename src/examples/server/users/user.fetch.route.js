module.exports = ({
  userService
}) => {
  return {
    handler: () => {
      return userService.fetchUsers()
    }
  }
}
