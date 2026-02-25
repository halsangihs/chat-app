import bcrypt from "bcrypt"
import { User } from "../models/user.js"

export const login = async (req,res) =>{
     const {email,password}=req.body
        if (!email || !password) {
            return res.json({
            success: false,
            message: "Please enter valid email or password",
        });
      }
     const user=await User.findOne({email})
       if (!user) {
        return res.json({
            success: false,
            message: "User not found",
        });
       }
     const hashed_pass=user.password
     const k=await bcrypt.compare(password,hashed_pass)
     if(!k) {
        return res.json({
            success:false,
            message:"Incorrect Password",
        })
     }
     return res.json({
            success:true,
            user: { name: user.name, email: user.email }
        })
     
}
 
export const signup =async (req,res) =>{
    const {name,email,password}=req.body

    const hashedPassword = await bcrypt.hash(password, 10);
   try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
     return res.json({
        success:true,
        user: {name: user.name, email: user.email }
     })
  }
  catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

}
