import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UserLoginsController {
  public async invoke({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.query().where('email', email).firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest({ error: 'Login ou senha inválidos' })
    }

    await this.deletePreviousTokens(user)

    const token = await auth.use('api').generate(user)

    return token
  }

  protected async deletePreviousTokens(user: User): Promise<void> {
    await Database.from('api_tokens').where('user_id', user.id).delete()
  }
}
