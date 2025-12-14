#!/usr/bin/env python3
"""
Email Server for Ayma & Fatima Atelier
Sends confirmation emails to clients after form submission
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Email configuration - Set these as environment variables or update here
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')  # Your email
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')  # Your email password or app password
FROM_EMAIL = os.getenv('FROM_EMAIL', SMTP_USERNAME)
FROM_NAME = os.getenv('FROM_NAME', 'Ayma & Fatima Atelier')

def send_email(to_email, subject, body_html, body_text=None):
    """Send an email using SMTP"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = f"{FROM_NAME} <{FROM_EMAIL}>"
        msg['To'] = to_email
        msg['Subject'] = subject

        # Add both plain text and HTML versions
        if body_text:
            part1 = MIMEText(body_text, 'plain')
            msg.attach(part1)
        
        part2 = MIMEText(body_html, 'html')
        msg.attach(part2)

        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        
        return True, "Email sent successfully"
    except Exception as e:
        return False, str(e)

@app.route('/api/send-appointment-confirmation', methods=['POST'])
def send_appointment_confirmation():
    """Send confirmation email for appointment requests"""
    try:
        data = request.json
        
        # Extract form data
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        country = data.get('country', '')
        preferred_location = data.get('preferred-location', '')
        event_type = data.get('event-type', '')
        event_date = data.get('event-date', '')
        interested_in = data.get('interested-in', '')
        dress_preference = data.get('dress-preference', '')
        dress_name = data.get('dress-name', '')
        message = data.get('message', '')
        
        if not email:
            return jsonify({'success': False, 'error': 'Email is required'}), 400
        
        # Create email content
        subject = "Thank You for Your Appointment Request - Ayma & Fatima Atelier"
        
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #F8F6F0; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; background-color: #FFFFFF; }}
                .footer {{ padding: 20px; text-align: center; font-size: 12px; color: #666; }}
                .info-row {{ margin: 10px 0; }}
                .label {{ font-weight: bold; color: #D4AF37; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="color: #2C2C2C; margin: 0;">Ayma & Fatima Atelier</h1>
                </div>
                <div class="content">
                    <p>Dear {name},</p>
                    <p>Thank you for your interest in <strong>Ayma & Fatima Atelier</strong>! We have received your appointment request and our team will contact you within <strong>24-48 hours</strong> to schedule your consultation.</p>
                    
                    <h3 style="color: #D4AF37; border-bottom: 2px solid #E8D5C4; padding-bottom: 10px;">Your Request Summary</h3>
                    
                    <div class="info-row"><span class="label">Preferred Location:</span> {preferred_location or 'Not specified'}</div>
                    <div class="info-row"><span class="label">Event Type:</span> {event_type or 'Not specified'}</div>
                    {f'<div class="info-row"><span class="label">Event Date:</span> {event_date}</div>' if event_date else ''}
                    {f'<div class="info-row"><span class="label">Interested In:</span> {interested_in}</div>' if interested_in else ''}
                    {f'<div class="info-row"><span class="label">Dress Preference:</span> {"Custom Design" if dress_preference == "custom" else "Specific Dress"}</div>' if dress_preference else ''}
                    {f'<div class="info-row"><span class="label">Dress Name:</span> {dress_name}</div>' if dress_name else ''}
                    {f'<div class="info-row"><span class="label">Message:</span> {message}</div>' if message else ''}
                    
                    <p style="margin-top: 30px;">If you have any urgent questions, please don't hesitate to contact us directly.</p>
                    
                    <p>Best regards,<br>
                    <strong>The Ayma & Fatima Atelier Team</strong></p>
                </div>
                <div class="footer">
                    <p>This is an automated confirmation email. Please do not reply to this message.</p>
                    <p>Ayma & Fatima Atelier | Pakistan & Canada</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_body = f"""
Dear {name},

Thank you for your interest in Ayma & Fatima Atelier! We have received your appointment request and our team will contact you within 24-48 hours to schedule your consultation.

Your Request Summary:
- Preferred Location: {preferred_location or 'Not specified'}
- Event Type: {event_type or 'Not specified'}
{f'- Event Date: {event_date}' if event_date else ''}
{f'- Interested In: {interested_in}' if interested_in else ''}
{f'- Dress Preference: {"Custom Design" if dress_preference == "custom" else "Specific Dress"}' if dress_preference else ''}
{f'- Dress Name: {dress_name}' if dress_name else ''}
{f'- Message: {message}' if message else ''}

If you have any urgent questions, please don't hesitate to contact us directly.

Best regards,
The Ayma & Fatima Atelier Team

---
This is an automated confirmation email. Please do not reply to this message.
Ayma & Fatima Atelier | Pakistan & Canada
        """
        
        success, message = send_email(email, subject, html_body, text_body)
        
        if success:
            return jsonify({'success': True, 'message': 'Confirmation email sent successfully'}), 200
        else:
            return jsonify({'success': False, 'error': message}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/send-contact-confirmation', methods=['POST'])
def send_contact_confirmation():
    """Send confirmation email for contact form submissions"""
    try:
        data = request.json
        
        # Extract form data
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        subject = data.get('subject', '')
        message = data.get('message', '')
        
        if not email:
            return jsonify({'success': False, 'error': 'Email is required'}), 400
        
        # Create email content
        email_subject = "Thank You for Contacting Ayma & Fatima Atelier"
        
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #F8F6F0; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; background-color: #FFFFFF; }}
                .footer {{ padding: 20px; text-align: center; font-size: 12px; color: #666; }}
                .info-row {{ margin: 10px 0; }}
                .label {{ font-weight: bold; color: #D4AF37; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="color: #2C2C2C; margin: 0;">Ayma & Fatima Atelier</h1>
                </div>
                <div class="content">
                    <p>Dear {name},</p>
                    <p>Thank you for reaching out to <strong>Ayma & Fatima Atelier</strong>! We have received your message and will respond to your inquiry within <strong>24-48 hours</strong>.</p>
                    
                    <h3 style="color: #D4AF37; border-bottom: 2px solid #E8D5C4; padding-bottom: 10px;">Your Inquiry</h3>
                    
                    <div class="info-row"><span class="label">Subject:</span> {subject or 'Not specified'}</div>
                    {f'<div class="info-row"><span class="label">Message:</span> {message}</div>' if message else ''}
                    
                    <p style="margin-top: 30px;">We appreciate your interest and look forward to assisting you.</p>
                    
                    <p>Best regards,<br>
                    <strong>The Ayma & Fatima Atelier Team</strong></p>
                </div>
                <div class="footer">
                    <p>This is an automated confirmation email. Please do not reply to this message.</p>
                    <p>Ayma & Fatima Atelier | Pakistan & Canada</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_body = f"""
Dear {name},

Thank you for reaching out to Ayma & Fatima Atelier! We have received your message and will respond to your inquiry within 24-48 hours.

Your Inquiry:
- Subject: {subject or 'Not specified'}
{f'- Message: {message}' if message else ''}

We appreciate your interest and look forward to assisting you.

Best regards,
The Ayma & Fatima Atelier Team

---
This is an automated confirmation email. Please do not reply to this message.
Ayma & Fatima Atelier | Pakistan & Canada
        """
        
        success, message = send_email(email, email_subject, html_body, text_body)
        
        if success:
            return jsonify({'success': True, 'message': 'Confirmation email sent successfully'}), 200
        else:
            return jsonify({'success': False, 'error': message}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'Email Server'}), 200

if __name__ == '__main__':
    # Check if credentials are set
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        print("WARNING: SMTP credentials not set!")
        print("Please set environment variables:")
        print("  export SMTP_USERNAME='your-email@gmail.com'")
        print("  export SMTP_PASSWORD='your-app-password'")
        print("  export FROM_EMAIL='your-email@gmail.com'")
        print("  export FROM_NAME='Ayma & Fatima Atelier'")
        print("\nOr update the variables in email_server.py")
    
    port = int(os.getenv('PORT', '5000'))
    app.run(host='0.0.0.0', port=port, debug=True)

