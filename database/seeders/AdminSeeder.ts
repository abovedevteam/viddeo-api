import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Company from 'App/Models/Company'

export default class AdminSeederSeeder extends BaseSeeder {
  public async run() {
    try {
      const company = await Company.create({
        name: 'Viddeo',
      })

      const user = await company.related('users').create({
        email: 'admin@viddeo.com',
        password: 'viddeo.com',
        name: 'Viddeo Admin',
        isAdmin: true,
      })

      company.ownerId = user.id
      company.save()
    } catch (err) {
      console.error(err.message)
    }
  }
}
