import mongoose from "mongoose";

const basketSchema=mongoose.Schema({
    image:{type:String,requried:true},
    name:{type:String,requried:true},
    price:{type:String,requried:true}
})

const basketModel=mongoose.model('basket',basketSchema)

export default basketModel