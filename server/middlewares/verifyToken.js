const jwt = require('jsonwebtoken')
const userModal = require('../models/user.model')

const verifyAccessToken = async (req,res,next)=>{
    const [tokenStd, tokenValue] = req?.headers?.authorization?.split(" ")
    const secKey = process.env.ACCESS_TOKEN_SECRET
    if(tokenStd !== 'JWT'){
        res.status(403).send({message:"The token is not a valid JWT"})
        return;
    }
    jwt.verify(tokenValue,secKey, async (err,decoded)=>{
        if(err){
            res.status(403).send({message:"The JWT is Invalid :("})
            return;
        }
        try {
            const user = await userModal.findById(decoded.id)
            req.user = user
            next();
        } catch (e) {
            console.log("err : ",e)
            res.status(500).send({message:"Server Error"})
        }
    })

}

const verifyRefreshToken = async (req,res,next)=>{
    const [tokenStd, tokenValue] = req?.headers?.authorization?.split(" ")
    const secKey = process.env.REFRESH_TOKEN_SECRET
    if(tokenStd !== 'JWT'){
        res.status(403).send({message:"The token is not a valid JWT"})
        return;
    }
    jwt.verify(tokenValue,secKey, async (err,decoded)=>{
        if(err){
            res.status(403).send({message:"The JWT is Invalid :("})
            return;
        }
        try {
            const user = await userModal.findById(decoded.id)
            req.user = user
            next();
        } catch (e) {
            console.log("err : ",e)
            res.status(500).send({message:"Server Error"})
        }
    })

}

module.exports = {verifyAccessToken, verifyRefreshToken};