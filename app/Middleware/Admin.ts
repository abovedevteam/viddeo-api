import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (!auth.user?.isAdmin) {
      return response.forbidden({ error: 'Sorry, you are not an administrator' })
    }
    await next()
  }
}
