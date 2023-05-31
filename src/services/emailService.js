require("dotenv").config();
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"đào văn thắng 👻" <daovanthang082@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
};
let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn đã nhận được email khi bạn đã đặt lịch khám online trên newline</p>
    <p>Thông tin đặt lịch khám:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>


    <p>Nếu các thông tin trên đúng thì vui lòng click vào đường link bên dưới để xác nhận thủ tục đặt lịch khám</p>
    <div>
        <a href="${dataSend.redirectLink}" target="_blank">click here</a>
    </div>

    <div> Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received an email when you booked your appointment online on newline</p>
    <p>Information to book an appointment:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>


    <p>If the above information is correct, please click on the link below to confirm the appointment procedure</p>
    <div>
        <a href="${dataSend.redirectLink}" target="_blank">click here</a>
    </div>

    <div> Sincerely thank!</div>
    `;
  }
  return result;
};
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn đã nhận được email khi bạn đã đặt lịch khám online trên newline thành công!</p>
    <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm:</p>

    <div> Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received an email when you booked your appointment online on newline success!</p>
    <p>Information:</p>

    <div> Sincerely thank!</div>
    `;
  }
  return result;
};
let sendAttachment = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"đào văn thắng 👻" <daovanthang082@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend), // html body
    attachments: [
      {
        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};
module.exports = {
  sendAttachment: sendAttachment,
  sendSimpleEmail: sendSimpleEmail,
};
