import mongoose from "mongoose";

const wishlistSchema=mongoose.Schema({
    image:{type:String,requried:true},
    name:{type:String,requried:true},
    price:{type:String,requried:true}
})

const wishlistModel=mongoose.model('wishlist',wishlistSchema)

export default wishlistModel