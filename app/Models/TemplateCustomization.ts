import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Template from './Template'

export default class TemplateCustomization extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public key: String

  @column()
  public isEditable: Boolean

  @column()
  public payload: Object

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Template)
  public template: BelongsTo<typeof Template>
}
