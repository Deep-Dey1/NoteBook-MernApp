import "../config/env.js"; // Load environment variables first
import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email for registration
export const sendOTPEmail = async (email, name, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "NoteBook <no-reply@deepdey.me>",
      to: email,
      subject: `Welcome to NoteBook! Verify your email with code: ${otp}`,
      replyTo: "support@deepdey.me",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 30px;
            text-align: center;
            color: white;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 40px 30px;
          }
          .otp-box {
            background-color: #1a1a1a;
            border: 2px dashed #3b82f6;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
          }
          .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #3b82f6;
            letter-spacing: 8px;
            margin: 10px 0;
          }
          .message {
            color: #666;
            font-size: 16px;
            line-height: 1.6;
          }
          .warning {
            background-color: #2d2d2d;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #e5e5e5;
          }
          .footer {
            background-color: #1a1a1a;
            padding: 20px;
            text-align: center;
            color: #999;
            font-size: 14px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📝 NoteBook</h1>
            <p style="margin: 5px 0 0 0;">Complete Your Registration</p>
          </div>
          
          <div class="content">
            <p class="message">Hello <strong>${name}</strong>,</p>
            <p class="message">
              Welcome to NoteBook - your personal note-taking companion! You're just one step away from accessing your account.
            </p>
            <p class="message">
              Please verify your email address by entering this verification code:
            </p>
            
            <div class="otp-box">
              <p style="margin: 0 0 10px 0; color: #a0a0a0;">Your Verification Code</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 10px 0 0 0; color: #888; font-size: 14px;">
                Valid for 5 minutes
              </p>
            </div>
            
            <div class="warning">
              <strong>⚠️ Security Reminder:</strong><br>
              This is a one-time verification code for your NoteBook account registration. Never share this code with anyone, even if they claim to be from NoteBook support.
            </div>
            
            <p class="message">
              If you didn't create a NoteBook account, you can safely ignore this email. Your email address will not be used.
            </p>
            
            <p class="message" style="margin-top: 20px;">
              Questions? Contact us at support@deepdey.me
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 5px 0;"><strong>NoteBook - Your Personal Note Taking App</strong></p>
            <p style="margin: 5px 0;">© 2025 NoteBook. All rights reserved.</p>
            <p style="margin: 5px 0; font-size: 12px;">This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
      text: `Hi ${name},

Welcome to NoteBook!

Your email verification code is: ${otp}

Please enter this code to complete your registration. This code will expire in 5 minutes.

If you didn't create a NoteBook account, you can safely ignore this email.

Questions? Contact us at support@deepdey.me

Best regards,
The NoteBook Team

---
NoteBook - Your Personal Note Taking App
© 2025 NoteBook. All rights reserved.
This is an automated message, please do not reply.`,
    });

    if (error) {
      console.error("Error sending OTP email:", error);
      throw new Error("Failed to send OTP email");
    }

    console.log(`OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, name, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "NoteBook Security <no-reply@deepdey.me>",
      to: email,
      subject: `Reset your NoteBook password - Code: ${otp}`,
      replyTo: "support@deepdey.me",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 30px;
            text-align: center;
            color: white;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 40px 30px;
          }
          .otp-box {
            background-color: #1a1a1a;
            border: 2px dashed #ef4444;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
          }
          .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #ef4444;
            letter-spacing: 8px;
            margin: 10px 0;
          }
          .message {
            color: #666;
            font-size: 16px;
            line-height: 1.6;
          }
          .warning {
            background-color: #2d2d2d;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #e5e5e5;
          }
          .alert {
            background-color: #2d2d2d;
            border-left: 4px solid #ef4444;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #e5e5e5;
          }
          .footer {
            background-color: #1a1a1a;
            padding: 20px;
            text-align: center;
            color: #999;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 NoteBook</h1>
            <p style="margin: 5px 0 0 0;">Password Reset Request</p>
          </div>
          
          <div class="content">
            <p class="message">Hello <strong>${name}</strong>,</p>
            <p class="message">
              We received a request to reset the password for your NoteBook account associated with this email address.
            </p>
            <p class="message">
              To proceed with resetting your password, please use this verification code:
            </p>
            
            <div class="otp-box">
              <p style="margin: 0 0 10px 0; color: #a0a0a0;">Password Reset Code</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 10px 0 0 0; color: #888; font-size: 14px;">
                Valid for 5 minutes only
              </p>
            </div>
            
            <div class="alert">
              <strong>🚨 Important Security Notice:</strong><br>
              If you did NOT request a password reset, please ignore this email and your password will remain unchanged. Consider changing your password if you're concerned about your account security.
            </div>
            
            <div class="warning">
              <strong>⚠️ Security Tips:</strong><br>
              • Never share this code with anyone<br>
              • NoteBook staff will never ask for your code<br>
              • This code expires in 5 minutes<br>
              • Only use this code on the official NoteBook website
            </div>
            
            <p class="message" style="margin-top: 20px;">
              Need help? Contact our support team at support@deepdey.me
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 5px 0;"><strong>NoteBook - Your Personal Note Taking App</strong></p>
            <p style="margin: 5px 0;">© 2025 NoteBook. All rights reserved.</p>
            <p style="margin: 5px 0; font-size: 12px;">This is an automated security message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
      text: `Hi ${name},

PASSWORD RESET REQUEST

We received a request to reset your NoteBook account password.

Your password reset code is: ${otp}

This code will expire in 5 minutes.

IMPORTANT: If you did NOT request a password reset, please ignore this email. Your password will remain unchanged.

Security Tips:
- Never share this code with anyone
- NoteBook staff will never ask for your code
- Only use this code on the official NoteBook website

Need help? Contact us at support@deepdey.me

Best regards,
The NoteBook Security Team

---
NoteBook - Your Personal Note Taking App
© 2025 NoteBook. All rights reserved.
This is an automated security message, please do not reply.`,
    });

    if (error) {
      console.error("Error sending password reset email:", error);
      throw new Error("Failed to send password reset email");
    }

    console.log(`Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
