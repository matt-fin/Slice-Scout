import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { clientConnection } from '@/utils/supabase/server';

const supabase = await clientConnection();

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
            ])

        if (error) {
            console.error('Supabase insertion failed:', error);
            return res.status(500).json({ success: false, message: 'Database insertion failed', error: error.message });
        }

        //const ticketId = data;

        try {
            // Set up nodemailer transport
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com", 
                port: 465,                
                secure: true,            
                auth: {
                    user: process.env.NEXT_PUBLIC_EMAIL_USER,  
                    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,  
                },
            });

            const mailOptions = {
                from: '"Slice Scout Support" <process.env.NEXT_PUBLIC_EMAIL_USER>', // Correct 'from' email
                to: recipientEmail,
                subject: `Thank you for your email, ${name}!`,
                html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <h1 style="color: #f57342;">Thank you for your email, ${name}! 🍕</h1>
            <p>  
                Our support team will respond to you as soon as possible within 24-48 hours. 
                If you have any other questions, you can respond to this email.
            </p>
            <hr style="border: 1px solid #ddd;" />
            <h3>Your Message:</h3>
            <p style="background-color: #f9f9f9; padding: 10px; border-left: 3px solid #f57342;">
                ${message.replace(/\n/g, '<br>')}
            </p>
            <p>Best regards,</p>
            <p><strong>Slice Scout Support</strong></p>
        </div>
    `
            };

            // Send email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info); // Log for debugging
/*
            const mailOptionsToSupport = {
                from: `"Slice Scout Support" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`, 
                to: process.env.NEXT_PUBLIC_EMAIL_USER,  // Your support email (e.g., support@yourcompany.com)
                subject: `New Ticket Submission (Ticket ID: ${ticketId}) from ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h1 style="color: #f57342;">New Ticket Submission from ${name}</h1>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${recipientEmail}</p>
                        <h3>Message:</h3>
                        <p style="background-color: #f9f9f9; padding: 10px; border-left: 3px solid #f57342;">
                            ${message.replace(/\n/g, '<br>')}
                        </p>
                    </div>
                `
            };

            const infoToSupport = await transporter.sendMail(mailOptionsToSupport);
            console.log('Support team email sent:', infoToSupport);
            */
            return res.status(200).json({ success: true, message: 'Email sent successfully', response: info });
        } catch (error) {
            console.error('Error occurred while sending email:', error); // Log error details
            return res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
