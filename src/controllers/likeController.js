const tweet = require('../models/tweet')

module.exports ={
    async create(req,res){
        const tweets = await tweet.findById(req.params.id)

        tweets.set({likes: tweets.likes+1})
        
        await tweets.save()

        req.io.emit("like",tweets)

        return res.json(tweets)
    }
}