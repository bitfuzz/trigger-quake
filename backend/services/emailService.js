import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smpt.ethereal.email',
    port: '587',
    auth: {
        user: 'maxime64@ethereal.email',
        pass: '3HRK3uuRG2anyhgPAv' 

    }
});



export const sendEmailAlert = async (email, quakeData) => {
const {place, magnitude, time} = quakeData;

try {
    
    const info = await transporter.sendMail({
        from: '"Quake Alert" <alert@triggerquake.com>',
            to: email,
            subject: ` Earthquake Alert: Mag ${magnitude} in ${place}`,
            text: `Heads up! A magnitude ${magnitude} earthquake was detected in ${place} at ${time}. Stay safe!`,
            html: `<h2> Earthquake Detected</h2>
                   <p><b>Location:</b> ${place}</p>
                   <p><b>Magnitude:</b> ${magnitude}</p>
                   <p><b>Time:</b> ${time}</p>
                   <p>You are receiving this because this location is within your alert radius.</p>`      
    });
    console.log(` Email sent to ${email}: ${nodemailer.getTestMessageUrl(info)}`);
    

} catch (error) {
    console.log('Email Failed', error)
    
}


} 