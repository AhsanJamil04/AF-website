# Email Server Setup Guide

## Overview
This email server sends confirmation emails to clients after they submit forms. It works alongside Formspree (which sends notifications to you).

## Setup Instructions

### Step 1: Install Dependencies
```bash
pip3 install -r requirements.txt
```

### Step 2: Configure Email Credentials

#### Option A: Using Gmail (Recommended for testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Ayma & Fatima Atelier Email Server"
   - Copy the 16-character password

3. **Set Environment Variables**:
```bash
export SMTP_USERNAME='your-email@gmail.com'
export SMTP_PASSWORD='your-16-char-app-password'
export FROM_EMAIL='your-email@gmail.com'
export FROM_NAME='Ayma & Fatima Atelier'
```

#### Option B: Using Other Email Providers

**For Outlook/Hotmail:**
```bash
export SMTP_SERVER='smtp-mail.outlook.com'
export SMTP_PORT='587'
export SMTP_USERNAME='your-email@outlook.com'
export SMTP_PASSWORD='your-password'
```

**For Custom SMTP:**
```bash
export SMTP_SERVER='smtp.yourdomain.com'
export SMTP_PORT='587'
export SMTP_USERNAME='your-email@yourdomain.com'
export SMTP_PASSWORD='your-password'
```

### Step 3: Run the Email Server

```bash
python3 email_server.py
```

The server will run on `http://localhost:5000`

### Step 4: Update Frontend (Already Done)
The forms are already configured to call the email endpoints after Formspree submission.

## API Endpoints

### 1. Send Appointment Confirmation
- **URL**: `http://localhost:5000/api/send-appointment-confirmation`
- **Method**: POST
- **Body**: JSON with form data
- **Response**: `{"success": true/false, "message": "..."}`

### 2. Send Contact Confirmation
- **URL**: `http://localhost:5000/api/send-contact-confirmation`
- **Method**: POST
- **Body**: JSON with form data
- **Response**: `{"success": true/false, "message": "..."}`

### 3. Health Check
- **URL**: `http://localhost:5000/health`
- **Method**: GET
- **Response**: `{"status": "healthy"}`

## Deployment Options

### Option 1: Local Development
Run the server locally alongside your website:
```bash
python3 email_server.py
```

### Option 2: Deploy to Cloud (Recommended for Production)

**Heroku:**
```bash
heroku create ayma-fatima-email
heroku config:set SMTP_USERNAME=your-email@gmail.com
heroku config:set SMTP_PASSWORD=your-app-password
git push heroku main
```

**Railway/Render:**
- Upload the code
- Set environment variables in dashboard
- Deploy

**PythonAnywhere:**
- Upload files
- Set up web app
- Configure environment variables

## Testing

1. Start the email server:
```bash
python3 email_server.py
```

2. Test the endpoint:
```bash
curl -X POST http://localhost:5000/api/send-appointment-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+92 1234567890",
    "preferred-location": "Pakistan",
    "event-type": "Bridal"
  }'
```

3. Check the email inbox for the confirmation email.

## Troubleshooting

### "SMTP credentials not set" Warning
- Make sure environment variables are set
- Or update variables directly in `email_server.py`

### "Authentication failed" Error
- For Gmail: Use App Password, not regular password
- Check 2FA is enabled
- Verify credentials are correct

### "Connection refused" Error
- Check SMTP server and port are correct
- Verify firewall settings
- Try different SMTP port (465 for SSL, 587 for TLS)

### Emails going to spam
- Use a professional email address (not free Gmail)
- Set up SPF/DKIM records for your domain
- Use a service like SendGrid or Mailgun for better deliverability

## Security Notes

1. **Never commit credentials** to Git
2. Use environment variables for sensitive data
3. Consider using a dedicated email service (SendGrid, Mailgun) for production
4. Enable HTTPS in production
5. Add rate limiting to prevent abuse

## Alternative: Use Email Service (Recommended for Production)

For better deliverability and reliability, consider:
- **SendGrid** (Free tier: 100 emails/day)
- **Mailgun** (Free tier: 5,000 emails/month)
- **Resend** (Free tier: 3,000 emails/month)
- **Amazon SES** (Very affordable)

These services provide better deliverability and are easier to set up.

