import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/templates', 'TemplatesController.index')

  Route.get('/templates/:id/customize', 'TemplateCustomizationsController.index')
  Route.put('/templates/:key/customize', 'TemplateCustomizationsController.update')

  Route.group(() => {
    Route.post('/templates', 'TemplatesController.store')
    Route.put('/templates/:id', 'TemplatesController.update')
    Route.delete('/templates/:id', 'TemplatesController.destroy')
  }).middleware('admin')
})
  .prefix('/api')
  .middleware('auth')
