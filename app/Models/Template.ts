import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import TemplateCustomization from './TemplateCustomization'
import Serialization from 'App/Helpers/Serialization'

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
      return Serialization.trimArrayString(value).slice(0, -1).split(',')
    },
  })
  public tags: String | Array<String>

  @beforeSave()
  public static async serializeTags(template: Template) {
    template.tags = Serialization.cleanUpArrayString(template.tags, true)
  }

  @column({
    serialize: Serialization.stringToJson,
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
