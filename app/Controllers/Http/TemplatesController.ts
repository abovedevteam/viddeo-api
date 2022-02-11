import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Template from 'App/Models/Template'
import CreateAndUpdateTemplateValidator from 'App/Validators/CreateAndUpdateTemplateValidator'

export default class TemplatesController {
  public async index({ request }: HttpContextContract) {
    const query = Template.query().whereNull('deleted_at')

    if (request.input('name')) {
      query.whereRaw(`LOWER(name) LIKE '%${request.input('name').toLowerCase()}%'`)
    }

    if (request.input('tags')) {
      const tags = request.input('tags').replaceAll(' ', '').split(',')

      for (const tag of tags) {
        query.whereRaw(`LOWER(tags) LIKE '%${tag.toLowerCase()},%'`)
      }
    }

    return await query.exec()
  }

  public async store({ request, response }: HttpContextContract) {
    const {
      name,
      description,
      instructions,
      ratio,
      tags,
      assets,
      template: aeTemplate,
      template_preview_image: templatePreviewImage,
    } = await request.validate(CreateAndUpdateTemplateValidator)

    const template = await Template.create({
      name,
      description,
      instructions,
      ratio,
      tags: Array(tags),
      assets,
    })

    await aeTemplate.moveToDisk(
      './templates',
      {
        name: `${template.id}_template.aep`,
        contentType: 'multipart/mixed',
        visibility: 'private',
      },
      's3'
    )

    if (templatePreviewImage)
      await templatePreviewImage.moveToDisk(
        './template_previews',
        {
          name: `${template.id}_template_preview.png`,
          contentType: 'image/png',
          visibility: 'public',
        },
        's3'
      )

    template.templateUrl = aeTemplate.filePath as string
    template.previewImageUrl = templatePreviewImage?.filePath as string
    template.save()

    return response.json(template)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const {
      name,
      description,
      instructions,
      ratio,
      tags,
      assets,
      template: aeTemplate,
      template_preview_image: templatePreviewImage,
    } = await request.validate(CreateAndUpdateTemplateValidator)

    await Template.query()
      .where('id', params.id)
      .update({ name, description, instructions, ratio, tags: Array(tags), assets })

    const template = await Template.findOrFail(params.id)

    await aeTemplate.moveToDisk(
      './templates',
      {
        name: `${template.id}_template.aep`,
        contentType: 'multipart/mixed',
        visibility: 'private',
      },
      's3'
    )

    if (templatePreviewImage)
      await templatePreviewImage.moveToDisk(
        './template_previews',
        {
          name: `${template.id}_template_preview.png`,
          contentType: 'image/png',
          visibility: 'public',
        },
        's3'
      )

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
