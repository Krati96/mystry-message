import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { url } from "inspector";

//emails hamesha async hote hain
export async function sendVerificationEmail(
    email:string,
    username: string,
    verifyCode: string
    ): Promise<ApiResponse> { //promise return hoga apiresponse type ka
      try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Hello Krati!, | Mymystry-message",
            react: VerificationEmail({username, otp:verifyCode}), //react vo component jo bhejna h
        })
        return {success:true, message:"Verification email send successfully."}
      } catch (emailError) {
        console.log("Error sending verification email",emailError);
        return {success:false, message:"Failed to send verification email"}
      }      
}
