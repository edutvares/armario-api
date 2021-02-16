"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    const data = request.all();

    const user = await User.create(data);

    return user;
  }

  async index({ request, response }) {
    const users = await User.all();

    const usersNotPassword = users.toJSON();

    usersNotPassword.map((user) => {
      user.password && delete user.password;
    });

    return usersNotPassword;
  }

  async login({ request, response, auth }) {
    try {
      const { email, password } = request.all();

      const token = await auth.attempt(email, password);

      return token;
    } catch (error) {
      return response.status(500).send({ error: error });
    }
  }
}

module.exports = UserController;
