import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAndUpdateTemplateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    instructions: schema.string.optional(),
    ratio: schema.string(),
    tags: schema.string(),
    assets: schema.string(),
    template_preview_image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'gif', 'webp'],
    }),
    template: schema.file({
      extnames: ['aep'],
    }),
  })

  public messages = {
    'name.required': 'O campo nome é obrigatório.',
    'description.required': 'O campo descrição é obrigatório.',
    'ratio.required': 'O campo posição da tela é obrigatório.',
    'tags.required': 'O campo tags é obrigatório.',
    'assets.required': 'O campo assets é obrigatório.',
    'template.required': 'O campo template é obrigatório.',
    'template.file': 'O template precisa ser um template válido.',
  }
}
