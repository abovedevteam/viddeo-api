import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Template from 'App/Models/Template'

export default class TemplatesController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const { name, description, instructions, ratio, tags, assets } = request.all()
    const template = await Template.create({ name, description, instructions, ratio, tags, assets })

    return response.json(template)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { name, description, instructions, ratio, tags, assets } = request.all()
    await Template.query()
      .where('id', params.id)
      .update({ name, description, instructions, ratio, tags, assets })

    const template = await Template.find(params.id)

    return response.json(template)
  }

  public async destroy({ params, response }: HttpContextContract) {
    await Template.query()
      .where('id', params.id)
      .andWhereNull('deleted_at')
      .update({ deletedAt: new Date() })

    return response.status(203)
  }
}
