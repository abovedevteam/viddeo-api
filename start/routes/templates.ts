import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/templates', 'TemplateController.index')

  Route.group(() => {
    Route.post('/templates', 'TemplateController.store')
    Route.put('/templates/:template', 'TemplateController.update')
    Route.delete('/templates/:template', 'TemplateController.delete')
  }).middleware('admin')
}).middleware('auth')
