import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TemplateCustomization from 'App/Models/TemplateCustomization'

export default class VideoRendersController {
  public async index({ request }: HttpContextContract) {
    const key = request.param('key')

    const templateToBeRendered = await TemplateCustomization.findByOrFail('key', key)

    const payloadProcessed = this.preparePayloadForRendering(key, templateToBeRendered.payload)
  }

  private preparePayloadForRendering(key: string, payload: object) {
    console.log({ key, payload })
  }
}
