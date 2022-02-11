import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import TemplateCustomization from './TemplateCustomization'

export default class Template extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public templateUrl: String

  @column()
  public name: String

  @column()
  public description: String

  @column()
  public instructions: String

  @column()
  public numberOfReviews: number

  @column()
  public ratio: String

  @column()
  public rating: number

  @column({
    serialize: (value: String) => {
      return value.replaceAll(' ', '').slice(0, -1).split(',')
    },
  })
  public tags: Array<String>

  @beforeSave()
  public static async serializeTags(template: Template) {
    let newTagsProperty

    if (typeof template.tags === 'string') {
      newTagsProperty = String(template.tags)
    } else {
      newTagsProperty = Array(template.tags).join(',')
    }
    newTagsProperty = newTagsProperty.replaceAll(/\["|\['|\"]|\']|"|'| /g, '')
    newTagsProperty = newTagsProperty.slice(-1, 1) === ',' ? newTagsProperty : newTagsProperty + ','

    template.tags = newTagsProperty
  }

  @column({
    serialize: (value: string) => {
      try {
        return JSON.parse(value)
      } catch {
        return JSON.parse(JSON.stringify(value))
      }
    },
  })
  public assets: Object

  @column()
  public previewImageUrl: String | null

  @column()
  public mp4PreviewUrl: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime

  @hasOne(() => TemplateCustomization)
  public templateCustomization: HasOne<typeof TemplateCustomization>
}
