import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';
 import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

 export async function POST(request:Request) {
    await dbConnect()
    try {
        const {username,email,password} = await request.json()
        //check user with existing username and verified
        const existingUserVerifiedByUsername = await UserModel.findOne(
            {username,isVerified:true})
        if(existingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message: "Username is already exists."
            },{status:400})
        }
        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already exists with this email."
                },{status:400})
            }else{
                const hashedPassword = await bcrypt.hash(password,10) // here 10 is number of promise
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000);
                await existingUserByEmail.save()
            }
        } else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = await new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save()
        }  
        //send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if(! emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            },{status:201})
        }

        return Response.json({
            success: true,
            message: "User registered successfully, please verify your email."
        },{status:500})
    } catch (error) {
        console.error("Error while registering user",error);
        return Response.json(
            {
                success: false,
                message: "Error in registering user."
            },
            {
                status: 500
            }
        )
    }
 }