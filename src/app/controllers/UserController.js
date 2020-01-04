import User from '../models/User';

class UserController {
  async store(req, res) {
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    const phoneExists = await User.findOne({
      where: { phone: req.body.phone },
    });

    if (emailExists || phoneExists) {
      return res.status(400).json({
        error: 'user.duplicated',
        message:
          'E-mail ou telefone informado já possuí cadastro, verifique seus dados',
      });
    }

    const { id, name, email, phone } = await User.create(req.body);

    return res.json({ id, name, email, phone });
  }
}

export default new UserController();
