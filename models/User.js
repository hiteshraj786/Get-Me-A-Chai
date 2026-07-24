import mongoose from "mongoose";
const {Schema, model} = mongoose; 

const UserSchema = new Schema({
    email:{type:String, required:true},
    username:{type:String, required:true},
    name:{type:String},
    profilepic:{type:String, required:false},
    coverpic:{type:String, required:false},
    razorpayId:{type:String, required:false},
    razorpaySecret:{type:String, required:false},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},

})


export default mongoose.models.User || model("User", UserSchema); ; 
