from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import uuid
import shutil

app = FastAPI(
    title="NoteKeep API",
    description="Backend API for the NoteKeep learning vault.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


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


@app.get("/api/test")
def test_connection():
    return {
        "message": "Frontend and backend are connected!",
        "application": "NoteKeep"
    }


@app.post("/api/documents")
async def upload_document(file: UploadFile = File(...)):
    file_extension = Path(file.filename).suffix
    stored_filename = f"{uuid.uuid4()}{file_extension}"

    file_path = UPLOAD_DIR / stored_filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Document uploaded successfully!",
        "original_filename": file.filename,
        "stored_filename": stored_filename
    }

@app.get("/api/documents")
def get_documents():
    documents = []

    for file_path in UPLOAD_DIR.iterdir():
        if file_path.is_file():
            documents.append({
                "filename": file_path.name
            })

    return documents