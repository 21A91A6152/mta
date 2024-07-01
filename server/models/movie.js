import mongoose from "mongoose";
const Schema = mongoose.Schema
let movieSchema=new Schema({
    name:{
        type:String ,
        required:true
    },
    director:{
        type:String ,
        required:true
    },
    genere:{
        type:String ,
        required:true
    },
    descrip:{
        type:String  ,
        required: true   
    },
    poster:{
        type:String  ,
        required: true   
    },
    trailer:{
        type:String  ,
        required: true   
    }

});
export default mongoose.model("movie",movieSchema)