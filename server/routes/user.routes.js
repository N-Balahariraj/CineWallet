const userController = require('../controllers/user.controller')

module.exports = (app) =>{
    app.post('/register',userController.Register)
    app.get('/login',userController.Login)
}