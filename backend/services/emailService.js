import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });
// console.log(process.env.QUAKE_PASSWORD);
// console.log(process.env.QUAKE_EMAIL);


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.QUAKE_EMAIL,
        pass: process.env.QUAKE_PASSWORD

    }
});



    export const sendEmailAlert = async (email, quakeData) => {
    const {place, magnitude, time} = quakeData;

    try {
        
        const info = await transporter.sendMail({
            from: '"Quake Alert" <quake.subscriptions@gmail.com>',

                to: email,
                subject: `Earthquake Alert: Mag ${magnitude} in ${place}`,
                text: `Heads up! A magnitude ${magnitude} earthquake was detected in ${place} at ${time}. Stay safe!`,
                html: `<h2> Earthquake Detected</h2>
                    <p><b>Location:</b> ${place}</p>
                    <p><b>Magnitude:</b> ${magnitude}</p>
                    <p><b>Time:</b> ${time}</p>
                    <p>You are receiving this because this location is within your alert radius.</p>`      
        });
        console.log(` Email sent to ${email}`);
        

    } catch (error) {
        console.log('Email Failed', error)
        
    }


} 