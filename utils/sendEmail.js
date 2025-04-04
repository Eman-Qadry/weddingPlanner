const nodemailer=require('nodemailer');

const sendEmail=async(receiver,subject,html)=>{
    try{
    const senderEmail = process.env.EMAIL_USER;
    const senderPassword = process.env.EMAIL_PASSWORD;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: senderEmail,
          pass: senderPassword,
        },
      });
      const mailOptions = {
        to: receiver,
        from: senderEmail,
        subject: subject,
        html:html
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
         
          return res.status(500).json({ message: "Failed to send email", error: error.message });
        }
       
        return res.status(200).json({ message: "Email sent successfully!" });
      });
    } catch (error) {
  
      return res.status(500).json({
        message: "An error occurred while sending the reset token. Please try again.",
        data: { error: error.message },
      });
    }
}


  module.exports=sendEmail;