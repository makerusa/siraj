# Siraj Center Website

A multi-page Node.js + Express website for Siraj Center.

## Pages
- `/` — Home
- `/about` — About Us
- `/mission` — Mission & Vision
- `/governance` — Governance & Oversight
- `/leadership` — Leadership / Board
- `/contact` — Contact Us (with email form)

## Project Structure
```
siraj-center/
├── server.js          # Express server + email handler
├── package.json
└── public/
    ├── index.html
    ├── about.html
    ├── mission.html
    ├── governance.html
    ├── leadership.html
    ├── contact.html
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Setup & Deployment on Hostinger

### 1. Upload Files
Upload all files to your Hostinger Node.js hosting root, maintaining the folder structure above.

### 2. Install Dependencies
In the Hostinger terminal or via SSH:
```bash
npm install
```

### 3. Set Environment Variables
In your Hostinger control panel, add these environment variables:

| Variable        | Value                          | Description                          |
|-----------------|--------------------------------|--------------------------------------|
| `SMTP_HOST`     | `smtp.gmail.com`               | Your SMTP server (Gmail shown)       |
| `SMTP_PORT`     | `587`                          | SMTP port (587 for TLS)              |
| `SMTP_USER`     | `your@gmail.com`               | Your sending email address           |
| `SMTP_PASS`     | `your-app-password`            | Gmail App Password (see below)       |
| `CONTACT_EMAIL` | `info@sirajcenter.org`         | Where contact form emails are sent   |
| `PORT`          | `3000`                         | (Hostinger usually sets this itself) |

### 4. Gmail App Password (recommended)
If using Gmail as your SMTP:
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate a password for "Mail" → "Other (custom name)"
4. Use that 16-character password as `SMTP_PASS`

### 5. Start the Server
Hostinger should auto-start using:
```bash
npm start
```
Or set the entry point to `server.js` in your Hostinger Node.js settings.

## Contact Form
The contact form at `/contact` submits to `POST /send-contact`.
The server emails the message to `CONTACT_EMAIL` with a reply-to of the sender's address.
No database required — emails are sent directly via Nodemailer.
