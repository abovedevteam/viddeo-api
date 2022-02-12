import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Template from './Template'
import Serialization from 'App/Helpers/Serialization'
import Company from './Company'

export default class TemplateCustomization extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public templateId: number

  @column({ serializeAs: null })
  public companyId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public key: String

  @column()
  public isEditable: Boolean

  @column({
    serialize: Serialization.stringToJson,
  })
  public payload: Object

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Template)
  public template: BelongsTo<typeof Template>

  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>
}
