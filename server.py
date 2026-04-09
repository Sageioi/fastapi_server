import uvicorn as uvi

def run_server(status = True):
   try:
    if status:
        uvi.run("app.main:app", host="127.0.0.1", port=8080, reload=True)
    else:
       print ("Server has not been started")
   except Exception as e:
       print(f"Error occured : {e}")

if "__main__" == __name__:
    run_server(status=True)
