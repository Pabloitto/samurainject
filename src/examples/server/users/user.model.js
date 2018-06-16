const users = []

module.exports = class User {
  constructor ({name, email}) {
    this.name = name
    this.email = email
  }
  static create ({name, email}) {
    users.push(new User({name, email}))
  }
  static fetch () {
    return users
  }
}
