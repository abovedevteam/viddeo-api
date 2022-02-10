import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'
import User from 'App/Models/User'

export default class UserRegistrationController {
  public async invoke({ request, response, auth }: HttpContextContract) {
    const {
      email,
      name,
      password,
      password_confirmation: passwordConfirmation,
      company_name: companyName,
    } = request.all()

    const { hasError, message } = await this.validateInput({
      email,
      name,
      companyName,
      password,
      passwordConfirmation,
    })

    if (hasError) {
      return response.badRequest({ error: message })
    }
    const company = await Company.create({ name: companyName })
    const user = await company.related('users').create({ email, name, password })
    company.ownerId = user.id
    company.save()

    const token = await auth.use('api').attempt(user.email, password)

    return { token, user }
  }

  private async validateInput({ email, name, companyName, password, passwordConfirmation }) {
    if (!name) {
      return { hasError: true, message: { field: 'name', message: 'O campo nome é obrigatório.' } }
    }

    if (!companyName) {
      return {
        hasError: true,
        message: { field: 'company_name', message: 'O campo nome da empresa é obrigatório.' },
      }
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
