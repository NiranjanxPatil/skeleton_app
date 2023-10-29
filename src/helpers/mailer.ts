import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {

    //This snippet is use to create token to hased token, if user is found in db then it change the userid by 
    //hased value and chages the expirey
    //same goes to verify and reset
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }



//It then creates a transport object using nodemailer.createTransport. This object is configured with details like the mail server host, 
//port, and authentication information.
// Next, it defines mailOptions with details for the email, such as the sender, recipient, subject, and an HTML message. 
//The message content includes a link with a token for email verification or password reset. The actual URL in the link depends on the value of process.env.domain.
// The function then sends the email using transport.sendMail(mailOptions). This returns a promise, so it awaits the result.
// Finally, it returns the response from the email sending process.
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
                //add this shit to .env file
                user: "39ac9087bfcd42",
                pass: "4a8e23f6e7dd8f"
            }
        });


      const mailOptions = {
          from: 'romeosin8141@gmail.com',
          to: email,
          subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
          html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
          or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
          </p>`
      }

      const mailresponse = await transport.sendMail
      (mailOptions);
      return mailresponse;

  } catch (error:any) {
      throw new Error(error.message);
  }
}