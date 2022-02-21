import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Company from './Company'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public companyId: Number | number

  @column()
  public videoUrl: String | string

  @column()
  public key: String | string

  @column()
  public renderProgress: Number

  @column({ serializeAs: null })
  public payloadSent: Object

  @column.dateTime()
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>
}
