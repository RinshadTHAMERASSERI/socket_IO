import bcrypt from 'bcrypt'
import pkg from "jsonwebtoken"
import nodemailer from 'nodemailer'
import userSchema from './model/user.model1.js'
const {sign} = pkg

const  transporter = nodemailer.createTransport({

    service:"gmail",
    auth:{
        user:'',
        pass:'',
    },
})

export async function signUp(req,res) {
    try{
        const{email,password,username,cpassword,phone,profile}= req.body;
        
        if(!(email&&username&&password&&cpassword&&phone&&profile))
            return res.status(404).send({msg:"fields are empty"});

        if(password!==cpassword)
            return res.status(404).send({msg:"password not maatch"})
        bcrypt.hash(password,10).then((hashedPassword)=>{
            userSchema.create({email,password:hashedPassword,username,phone,profile}).then(()=>{
                return res.status(201).send({msg:"succesfull"})
            }).catch((error)=>{
            res.status(404).send({msg:"not registered"})
        })
        }).catch((error)=>{
            res.status(404).send({msg:"error"})
        })
    }catch(error){
        return res.status(404).send({msg:"error"})
    }
}

export async function signIn(req,res) {
    try{
        const{email,password}=req.body
        if(!(email&&password))
            return res.status(404).send({msg:'fiels are empty'})
        
        const user = await userSchema.findOne({email})

        if(user === null)
            return res.status(404).send({msg:"invalid email"})

        const succcess = await bcrypt.compare(password,user.password)
        if(succcess!== true)
            return res.status(404).send({msg:' email or password not match'})

        const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:'24h'})
        return res.status(200).send({msg:'successfully logined',token})

    }catch (error){
        return res.status(404).send({msg:'error'})

    }
   
}
export async function profile (req,res) {
    try{
        const _id = req.user.userId

        const user = await userSchema.findOne({_id},{password:0});
        if(!user)
            return res.status(403).send({msg:'login to continue'})
        return res.status(200).send(user)
    }catch(error){
        return res.status(404).send ({msg:'error'})
    }
    
}