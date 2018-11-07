const express = require ('express')
const routes = express.Router()

const tweetControler = require('./controllers/tweetController')
const likeController = require('./controllers/likeController')

routes.get('/tweets',tweetControler.index);
routes.post('/tweets',tweetControler.create);

routes.post('/likes/:id',likeController.create)


module.exports = routes;