import mongoose from "mongoose";
const Schema = mongoose.Schema
let studentSchema=new Schema({
    fname:{
        type:String ,
        required:true
    },
    lname:{
        type:String ,
        required:true
    },
    email:{
        type:String ,
        required:true
    },
    password:{
        type:String  ,
        required: true   
    },
    phone:{
        type:String  ,
        required: true   
    }

});
export default mongoose.model("mdata",studentSchema)