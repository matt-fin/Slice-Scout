import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name, recipientEmail, message } = req.body;

        // Insert ticket data into Supabase
        const { data, error } = await supabase
            .from('ticket_submissions')
            .insert([
                {
                    user_name: name,
                    email: recipientEmail,
                    ticket_message: message,
                    ticket_status: 'Pending'
                }
            ]);

        if (error) {
            console.error('Supabase insertion failed:', error);
            return res.status(500).json({ success: false, message: 'Database insertion failed', error: error.message });
        }

        try {
            // Set up nodemailer transport
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com", 
                port: 587,                
                secure: false,            
                auth: {
                    user: process.env.NEXT_PUBLIC_EMAIL_USER,  
                    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,  
                },
            });

            const mailOptions = {
                from: '"Slice Scout Support" <process.env.NEXT_PUBLIC_EMAIL_USER>', // Correct 'from' email
                to: recipientEmail,
                subject: `Thank you for your email, ${name}!`,
                text: `Our support team will respond to you as soon as possible within 24-48 hours. \nIf you have any other questions, you can respond to this email.\n\n${message}\n\nBest regards,\nSlice Scout Support`
            };

            // Send email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info); // Log for debugging

            return res.status(200).json({ success: true, message: 'Email sent successfully', response: info });
        } catch (error) {
            console.error('Error occurred while sending email:', error); // Log error details
            return res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
