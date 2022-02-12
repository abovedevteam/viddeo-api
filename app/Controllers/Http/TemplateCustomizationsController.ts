import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TemplateCustomization from 'App/Models/TemplateCustomization'

export default class TemplateCustomizationsController {
  public async index({ params, response, auth }: HttpContextContract) {
    const currentCompany = await auth.user?.related('company').query().first()

    const currentCompanyCustomizations = await currentCompany?.related('customizations')
    let templateCustomization = await currentCompanyCustomizations
      ?.query()
      .where('template_id', params.id)
      .first()

    if (templateCustomization) {
      return response.json(templateCustomization)
    }

    const key = (Math.random() * 100).toString(32)

    templateCustomization = await currentCompanyCustomizations?.create({
      key,
      payload: {},
      templateId: params.id,
    })

    return response.json(templateCustomization)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { payload } = request.all()

    const templateCustomization = await TemplateCustomization.findByOrFail('key', params.key)

    templateCustomization.payload = payload
    templateCustomization.save()

    return response.json(templateCustomization)
  }
}
