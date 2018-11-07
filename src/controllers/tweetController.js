const tweet = require('../models/tweet')

module.exports ={
    async index(req,res){
        const tweets = await tweet.find({}).sort('-createdAt') //Retorna todos os Tweets

        return res.json(tweets)
    },
    async create(req,res){  
        const tweets = await tweet.create(req.body)
        
        req.io.emit('tweet',tweets)

        return res.json(tweet)
    }
}