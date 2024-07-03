const movieController = require('../controllers/movie.controller')

module.exports = (app) => {
    app.post('/Add',movieController.create)
    app.get('/View',movieController.read)
    app.delete('/Remove/:title',movieController.delete)
    app.put('/Edit/:title',movieController.update)
}