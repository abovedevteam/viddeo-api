import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'UserLoginsController.invoke')
  Route.post('register', 'UserRegistrationController.invoke')
}).prefix('/api')
