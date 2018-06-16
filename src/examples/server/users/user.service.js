const UserService = ({
  userModel
}) => {
  const fetchUsers = () => {
    return userModel.fetch()
  }
  const createUser = (user) => {
    return userModel.create(user)
  }
  return {
    fetchUsers,
    createUser
  }
}

module.exports = {
  UserService
}
