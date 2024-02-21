import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
 service:"gmail",
//   port: 465,
//   secure: true,
  auth: {
   
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASSWORD,
  },
});




interface mailProps {
    receiverMail:string;
    text: string
}

export async function sendMail({receiverMail,text}:mailProps){

    return await transporter.sendMail({
        from: 'Sky Tech',
        to: receiverMail, 
        subject: `${text} is your verification code`,
        text: "OTP Verify code", 
        html: `<b>${text}<b/>`, // html body
      });
}

