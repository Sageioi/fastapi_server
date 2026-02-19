import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("MAILGUN_API_KEY")
DOMAIN = os.getenv("DOMAIN")


def send_simple_message():
    url = f"https://api.mailgun.net/v3/{DOMAIN}/messages"

    auth = ("api", API_KEY)

    data = {
        "from": f"Mailgun Sandbox <postmaster@{DOMAIN}>",
        "to": ["tegaisikuru@gmail.com"],
        "subject": "Hello from MyMom API",
        "text": "If you see this, your email configuration is working!"
    }

    response = requests.post(url, auth=auth, data=data)

    if response.status_code == 200:
        print("Success! Email sent.")
    else:
        print(f"Failed. Status Code: {response.status_code}")
        print(f"Response: {response.text}")


if __name__ == "__main__":
    send_simple_message()