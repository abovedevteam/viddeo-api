import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Templates extends BaseSchema {
  protected tableName = 'templates'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('template_url').nullable()
      table.string('description').nullable()
      table.string('instructions').nullable()
      table.float('rating').defaultTo(0.0)
      table.string('ratio').defaultTo('landscape')
      table.integer('number_of_reviews').defaultTo(0)
      table.text('tags').nullable()
      table.json('assets').nullable()
      table.string('mp4_preview_url').nullable()
      table.string('preview_image_url').nullable()

      table.timestamp('deleted_at', { useTz: true }).nullable().defaultTo(null)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
