const movieController = require('../controllers/movie.controller')
const middlewares = require('../middlewares')

module.exports = (app) => {
    app.use(middlewares.verifyToken)
    app.post('/Add',movieController.create)
    app.get('/View',movieController.read)
    app.delete('/Remove/:title',movieController.delete)
    app.put('/Edit/:title',movieController.update)
}