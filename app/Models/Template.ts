import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import TemplateCustomization from './TemplateCustomization'

export default class Template extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public templateUrl: number

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

  @column()
  public tags: Array<String>

  @column()
  public assets: Object

  @column()
  public previewImageUrl: String

  @column()
  public mp4PreviewUrl: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => TemplateCustomization)
  public templateCustomization: HasOne<typeof TemplateCustomization>
}
