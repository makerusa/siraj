const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve pages
const pages = ['index', 'about', 'mission', 'governance', 'leadership', 'contact'];
pages.forEach(page => {
  const route = page === 'index' ? '/' : `/${page}`;
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', `${page}.html`));
  });
});

// Contact form POST
app.post('/send-contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
  }

  // Configure your email credentials via environment variables in Hostinger
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Siraj Center Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Siraj Center Contact] ${subject || 'New Message'}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #f9fafb; border-radius: 8px;">
          <h2 style="color: #065f46; border-bottom: 2px solid #d1fae5; padding-bottom: 12px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || '(none)'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #fff; padding: 16px; border-radius: 6px; border-left: 4px solid #10b981;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">Sent from sirajcenter.org contact form</p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Your message has been sent. We will be in touch soon.' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, error: 'Failed to send message. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Siraj Center server running on port ${PORT}`);
});
