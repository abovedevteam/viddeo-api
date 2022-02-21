import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/render', 'VideoRenderController.index')
  Route.get('/render/:key', 'VideoRenderController.show')

  Route.post('/render', 'VideoRenderController.store')
})
  .prefix('/api')
  .middleware('auth')
