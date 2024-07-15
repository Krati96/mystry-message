import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod';
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    //Not needed anymore in latest versions of nextjs
    // if(request.method !== 'GET'){
    //     return Response.json(
    //         {success: false,
    //             message: "Only GET method is allowed"},{status: 405})
    // }
    await dbConnect()
    try {
        //localhoast://3000/api/hone?username=krati?city=noida
        const {searchParams} = new URL(request.url)
        const queryparam = {
            username: searchParams.get('username')
        }
        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryparam) //parsing safe hui or schema follow hua toh value mil jayegi
        console.log(result);// remove it later
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : 'Invalid query parameter'
            },{status: 400})
        }
        
        const {username} = result.data
        const existingUserVerified = await UserModel.findOne({username, isVerified:true})
        if(existingUserVerified){
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken."
                },
                {status: 400})
        }
        return Response.json(
            {
                success: true,
                message: "Username is unique"
            },
            {status: 200})
    } catch (error) {
        console.error("Error checking username",error);
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            {status: 500}
        )
        
    }
}