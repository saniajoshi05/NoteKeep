from fastapi import FastAPI

app = FastAPI(
    title="NoteKeep API",
    description="Backend API for the NoteKeep learning vault.",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to the NoteKeep API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }