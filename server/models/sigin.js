import mongoose from "mongoose";
const Schema = mongoose.Schema
let signinSchema=new Schema({
    email:{
        type:String ,
        required:true
    },
    password:{
        type:String ,
        required:true
    },
     

});
export default mongoose.model("bookdata",signinSchema)