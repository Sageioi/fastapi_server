from dotenv import load_dotenv
load_dotenv()
import os

import uvicorn as uvi

def run_server(status = True):
   try:
    if status:
        uvi.run("app.main:app", host="0.0.0.0", port=int(os.getenv("PORT")), reload=False)
    else:
       print ("Server has not been started")
   except Exception as e:
       print(f"Error occured : {e}")

if "__main__" == __name__:
    run_server(status=True)
