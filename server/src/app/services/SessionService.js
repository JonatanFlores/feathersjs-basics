const { BadRequest } = require("@feathersjs/errors");

const { User } = require("../models");

class SessionService {
  async create(data, res) {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return new BadRequest("User not found");
    }

    if (!(await user.checkPassword(password))) {
      return new BadRequest("Invalid credentials");
    }

    return {
      name: user.name,
      email: user.email,
      token: user.generateToken()
    };
  }
}

module.exports = new SessionService();
