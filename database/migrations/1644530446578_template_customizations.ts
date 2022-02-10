import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TemplateCustomizations extends BaseSchema {
  protected tableName = 'template_customizations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.boolean('is_editable').defaultTo(true)
      table.string('key').notNullable()
      table.json('payload').notNullable()

      table.bigInteger('template_id').unsigned().references('templates.id').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
