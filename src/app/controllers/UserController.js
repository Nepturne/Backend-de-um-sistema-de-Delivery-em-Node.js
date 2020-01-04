import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({
        error: 'email.duplicated',
        message: 'O e-mail informado já possuí cadastro, verifique seus dados',
      });
    }

    const { id, name, email, phone } = await User.create(req.body);

    return res.json({ id, name, email, phone });
  }
}

export default new UserController();
