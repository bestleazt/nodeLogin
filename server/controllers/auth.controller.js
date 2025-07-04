import createError from "../utils/createError.js";
import prisma from "../config/prisma.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res, next)=>{
    try{
        //TODO 
    /**
     * 1. check body
     * 2. check email in DB
     * 3. encypt Password -> bcryptjs
     * 4. insert into DB
     * 5. Response 
     */

    // 1. check body
    const {email,name,password} = req.body
    // 2. check in DB 
    const user = await prisma.user.findFirst({
        where : {
            email:email,
        }
    });
     if(user){
        createError(400,"Email already exist!!!")
    }

    // 3. encrypt Password // แปลง 
    const hashPassword = bcrypt.hashSync(password,10)

    // 4. Insert into DB 
     await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:hashPassword
        }
    })
    // 5. response
    res.json({
        message:"Register Success!!!"
    });
    }catch(error){
        next(error);
    }
};

export const login = async (req,res,next)=>{
   try {
    /*
    1. Validate
    2. ckeck Email
    3. check Password
    4. Generate Token
    5. Response
    */

    // 2. ckeck Email
    const {email,password} = req.body;
    const user = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if(!user){
        createError(400,"Email or Password is Invalid!!!")
    }

    // 3. check Password
    const checkPassword = bcrypt.compareSync(password,user.password)
    if(!checkPassword){
        createError(400,"Email or Password is Invalid!!!") 
    }

    // 4. Generate Token

    const payload = {
        id:user.id,
        name:user.name,
        role:user.role
    }
    const token = jwt.sign(payload,process.env.SECRET,{
        expiresIn:'1d'
    })
      // 5. response
     res.json({
        message:"Login Success",
        payload:payload,
        token:token
    });
   } catch (error) {
    next(error)
   }
}
