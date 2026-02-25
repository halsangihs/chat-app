import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    name:{
      type :String,
      required:true
    },
    email: {
    type: String,
    unique: true,
    required: true,
    },
   password: {
    type: String,
    required: true
   },
   socket_id:{
    type:String,
   },
   isActive:{
    type:Boolean,
    default:false
   }
  
},{ timestamps: true })

export const User=mongoose.model("user",userSchema);