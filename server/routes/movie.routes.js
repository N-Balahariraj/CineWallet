const movieController = require('../controllers/movie.controller')
const token = require('../middlewares/verifyToken')

module.exports = (app) => {
    app.post('/Add',token.verifyAccessToken,movieController.create)
    app.get('/View',token.verifyAccessToken,movieController.read)
    app.delete('/Remove/:title',token.verifyAccessToken,movieController.delete)
    app.put('/Edit/:title',token.verifyAccessToken,movieController.update)
}