import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const { recipientEmail, name, message } = req.body;

        const  { data, error } = await supabase
            .from('ticket_submissions')
            .insert([
                {
                    user_name: name,
                    email: recipientEmail,
                    ticket_message: message,
                    ticket_status: 'Pending'
                }
            ]);

        return new Promise<void>((resolve, reject) => {
            const transporter: nodemailer.Transporter = nodemailer.createTransport({
                host: "gmail",
                auth: {
                    user: process.env.NEXT_PUBLIC_EMAIL_USER,
                    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
                },
            });

            const mailOptions = {
                from: process.env.NEXT_PUBLIC_EMAIL_USER,
                to: recipientEmail,
                subject: `Thank you for your email, ${name}!`,
                text: `Our support team will respond to you as soon as possible within 24-48 hours.\n\n${message}\n\nBest regards,\nSlice Scout Support`
            };

            transporter
            .sendMail(mailOptions)
            .then((response) => {
                res.status(200).json({ success: true, message: 'Email sent successfully', response });
            resolve();
            })
            .catch ((error) => {
                res.status(500).json({ success: false, error: true, errors: [error], message: 'Failed to send email' });
            reject(new Error(error));
        });
    });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}