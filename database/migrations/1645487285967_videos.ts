import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Videos extends BaseSchema {
  protected tableName = 'videos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.bigInteger('company_id').unsigned().references('companies.id').onDelete('CASCADE')

      table.string('key').unique().notNullable()
      table.string('video_url').nullable()
      table.integer('render_progress').defaultTo(0)
      table.text('payload_sent').nullable()

      table.timestamp('expires_at').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
