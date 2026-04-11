from dotenv import load_dotenv
load_dotenv(override=False)
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

gmail_user = os.getenv("GMAIL_USER")
gmail_password = os.getenv("GMAIL_PASSWORD")

def send_verification_email(user_email, verification_token, name: str, purpose: str):
    msg = MIMEMultipart()
    msg["From"] = f"Tegatech <{gmail_user}>"
    msg["To"] = user_email
    msg["Subject"] = f"{name}"
    
    body = f"Hi {name},\n\nHere is your token for {purpose}:\n\n{verification_token}\n\nTegatech"
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.ehlo()
            server.starttls()
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, user_email, msg.as_string())
        print("Email sent successfully!")
        return {"success": True}
    except Exception as e:
        print(f"Failed to send email: {e}")
        return {"success": False, "error": str(e)}

