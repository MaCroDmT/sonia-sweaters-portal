import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address (maiiialll308@gmail.com)
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    // Send email to yourself with the contact form details
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, // sender address (from the form)
      to: process.env.EMAIL_USER,    // list of receivers (send to yourself)
      subject: `New Contact Form Submission from ${name}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`, // html body
    });

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.post('/api/apply', upload.single('resume'), async (req, res) => {
  const { jobTitle, name, email, message } = req.body;
  const file = req.file;

  if (!name || !email || !jobTitle) {
    return res.status(400).json({ error: 'Please provide name, email, and job title.' });
  }

  try {
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'maiiialll@soniagroup.com', // Explicitly requested by user
      subject: `New Job Application: ${jobTitle} - ${name}`,
      text: `Job Title: ${jobTitle}\nName: ${name}\nEmail: ${email}\n\nCover Letter/Message:\n${message}`,
      html: `<h2>New Job Application</h2>
             <p><strong>Position:</strong> ${jobTitle}</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`,
    };

    if (file) {
      mailOptions.attachments = [
        {
          filename: file.originalname,
          content: file.buffer
        }
      ];
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Application sent: %s', info.messageId);
    res.status(200).json({ success: true, message: 'Application sent successfully!' });
  } catch (error) {
    console.error('Error sending application email:', error);
    res.status(500).json({ error: 'Failed to send application. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
