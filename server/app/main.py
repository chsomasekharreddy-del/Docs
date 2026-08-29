from fastapi import FastAPI
from .routers import user, auth

app = FastAPI(title="HealthSage API")

@app.get("/")
def root():
    return {"message": "Welcome to HealthSage"}

app.include_router(user.router)
app.include_router(auth.router)