import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TemplateCustomization from './TemplateCustomization'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column({ serializeAs: null })
  public ownerId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  public owner: BelongsTo<typeof User>

  @hasMany(() => TemplateCustomization)
  public customizations: HasMany<typeof TemplateCustomization>
}
