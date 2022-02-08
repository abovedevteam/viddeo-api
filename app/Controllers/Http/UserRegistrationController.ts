import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserRegistrationController {
  public async invoke({ request, response, auth }: HttpContextContract) {
    const { email, name, password, password_confirmation: passwordConfirmation } = request.all()

    const { hasError, message } = await this.validateInput({
      email,
      name,
      password,
      passwordConfirmation,
    })

    if (hasError) {
      return response.badRequest({ error: message })
    }

    const user = await User.create({ email, name, password })

    const token = await auth.use('api').attempt(user.email, password)

    return { token, user }
  }

  private async validateInput({ email, name, password, passwordConfirmation }) {
    if (!name) {
      return { hasError: true, message: { field: 'name', message: 'O campo nome é obrigatório.' } }
    }

    let user = await User.findBy('email', email)

    if (user) {
      return {
        hasError: true,
        message: { field: 'email', message: 'Já existe um usuário com este email.' },
      }
    }

    if (!passwordConfirmation) {
      return {
        hasError: true,
        message: {
          field: 'password_confirmation',
          message: 'O campo confirmação de senha é obrigatório.',
        },
      }
    }

    if (password !== passwordConfirmation) {
      return {
        hasError: true,
        message: {
          field: ['password_confirmation', 'password'],
          message: 'Senha e confirmação de senha são diferentes.',
        },
      }
    }

    return { hasError: false, message: null }
  }
}
