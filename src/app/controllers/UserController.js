import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
      user_adm_type: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'empty.required.fields',
        message: 'Verifique se todos os campos foram preenchidos',
      });
    }

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

    const { id, name, email, phone, user_adm_type } = await User.create(
      req.body
    );

    return res.json({ id, name, email, phone, user_adm_type });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'empty.required.fields',
        message: 'Verifique se todos os campos foram preenchidos',
      });
    }

    const { email, phone, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({
          error: 'user.duplicated',
          message: 'E-mail informado já possuí cadastro, verifique seus dados',
        });
      }
    }

    if (phone !== user.phone) {
      const userExists = await User.findOne({ where: { phone } });

      if (userExists) {
        return res.status(400).json({
          error: 'user.duplicated',
          message:
            'Telefone informado já possuí cadastro, verifique seus dados',
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'invalid.credentials',
        message: 'E-mail e/ou senha inválidos',
      });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
    });
  }

  async indexCount(req, res) {
    const user = await User.findAndCountAll();
    return res.json(user);
  }

  async returnUser(req, res) {
    const user = await User.findAll();
    return res.json(user);
  }
}

export default new UserController();
