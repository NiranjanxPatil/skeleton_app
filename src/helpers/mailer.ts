import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}
    :any) => {
        try {
            // create a hased token
            const hash = await bcryptjs.hash(userId.toString(), 10)

            await User.findByIdAndUpdate(UserId,
                {resetPasswordToken: hasedToken,
                resetPasswordExpires: Data})
        } catch (error:any) {
            throw new Error(error.mesaaage);
        }
    }
