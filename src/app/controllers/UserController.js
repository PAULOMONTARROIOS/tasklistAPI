import User from './../models/User'
import * as Yup from 'yup'

class UserController {

  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(5).required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erorr: "Os dados estão inconsistêntes" })
    }

    const userExists = await User.findOne({
      where: { email: req.body.email }
    })

    if (userExists) {
      return res.status(400).json({ error: "User already exists." })
    }

    const { id, name, email } = await User.create(req.body)

    return res.status(201).json({ id, name, email })
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(5),
      password: Yup.string().min(5).when('oldPassword', (oldPassword, field) => {
        return oldPassword ? field.required() : field
      }),
      confirmPassword: Yup.string().min(5).when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field
      })
    })

    const t = await schema.isValid(req.body)
    console.log(req.body)

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na validação" })
    }

    const { email, oldPassword } = req.body

    const user = await User.findByPk(req.userId)

    if (user.email !== email) {
      const userExists = await User.findOne({ where: { email } })
      if (userExists) {
        return res.status(400).json({ error: "E-mail already exists." })
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Senha inválida" })
    }

    const { id, name } = await user.update(req.body)

    return res.json({ id, name, email })
  }

}

export default new UserController()
