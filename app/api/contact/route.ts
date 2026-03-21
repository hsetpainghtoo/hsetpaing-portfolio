import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { render } from '@react-email/components';
import ContactEmail from '../../../emails/Contact';

// Define validation schema to match frontend
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // const file = formData.get('attachment') as File | null;
    // let attachments = [];
    
    // if (file && file.size > 0) {
    //   const bytes = await file.arrayBuffer();
    //   const buffer = Buffer.from(bytes);
    //   attachments.push({
    //     filename: file.name,
    //     content: buffer,
    //     contentType: file.type,
    //   });
    // }

    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Render React Email to HTML string
    const emailHtml = await render(
      ContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message
      })
    );

    // Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self (portfolio owner)
      replyTo: validatedData.email,
      subject: `New Contact Form Submission from ${validatedData.name} on Portfolio`,
      html: emailHtml,
      // attachments: attachments.length > 0 ? attachments : undefined,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to send email.' },
      { status: 500 }
    );
  }
}
