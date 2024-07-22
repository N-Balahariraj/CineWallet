const userController = require('../controllers/user.controller')
const token = require('../middlewares/verifyToken')

module.exports = (app) =>{
    app.post('/register',userController.Register)
    app.post('/login',userController.Login)
    app.get('/refresh',token.verifyRefreshToken,userController.AccessRefresh)
}