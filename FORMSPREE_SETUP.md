# Formspree Auto-Reply Email Setup

## How to Enable Auto-Reply Emails for Clients

Formspree can automatically send confirmation emails to clients when they submit forms. Here's how to set it up:

### Step 1: Log into Formspree Dashboard
1. Go to https://formspree.io/
2. Log into your account
3. Navigate to your form: `https://formspree.io/f/xwpgzwbq`

### Step 2: Enable Auto-Reply
1. In your form settings, look for **"Auto-Responder"** or **"Auto-Reply"** section
2. Enable the auto-reply feature
3. Configure the email template:

**For Appointment Form:**
```
Subject: Thank You for Your Appointment Request - Ayma & Fatima Atelier

Dear [Name],

Thank you for your interest in Ayma & Fatima Atelier! We have received your appointment request and our team will contact you within 24-48 hours to schedule your consultation.

Here's a summary of your request:
- Preferred Location: [Preferred Appointment Location]
- Event Type: [Type of Event]
- Event Date: [Event Date]

If you have any urgent questions, please don't hesitate to contact us directly.

Best regards,
Ayma & Fatima Atelier Team
```

**For Contact Form:**
```
Subject: Thank You for Contacting Ayma & Fatima Atelier

Dear [Name],

Thank you for reaching out to Ayma & Fatima Atelier! We have received your message and will respond to your inquiry within 24-48 hours.

Subject: [Subject]

We appreciate your interest and look forward to assisting you.

Best regards,
Ayma & Fatima Atelier Team
```

### Step 3: Configure Reply-To Field
The forms are already configured with `_replyto` field that uses the client's email address. This ensures:
- Auto-reply emails go to the correct client email
- You can reply directly to the client from your email

### Step 4: Test the Setup
1. Submit a test form from the website
2. Check that you receive the notification email
3. Check that the client receives the auto-reply email

### Additional Formspree Features You Can Enable:

1. **Email Notifications**: You'll receive emails when forms are submitted (already enabled)
2. **Auto-Reply**: Clients receive confirmation emails (needs to be enabled in dashboard)
3. **Webhooks**: For custom integrations (optional)
4. **Spam Protection**: Already enabled by default
5. **Custom Redirect**: After form submission (optional)

### Current Form Configuration:

- **Endpoint**: `https://formspree.io/f/xwpgzwbq`
- **Reply-To**: Automatically set to client's email
- **Subject**: Custom subject for each form type
- **Method**: POST with JSON response

### Notes:
- Auto-reply emails are sent from Formspree's servers
- You can customize the email template in the Formspree dashboard
- The `_replyto` field ensures proper email routing
- Free Formspree accounts have limited auto-reply features
- Paid plans offer more customization options

