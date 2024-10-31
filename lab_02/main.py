import shutil
import os

import uvicorn
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from manager import Manager

UPLOAD_FOLDER = 'uploaded_images'
TEMPLATES_FOLDER = 'templates'

app = FastAPI()
templates = Jinja2Templates(directory="templates")
manager = Manager(UPLOAD_FOLDER)

app.mount("/uploads", StaticFiles(directory=UPLOAD_FOLDER), name="uploads")
app.mount("/templates", StaticFiles(directory=TEMPLATES_FOLDER), name="templates")


@app.post("/upload")
async def upload_file(request: Request, file: UploadFile = File(...)):
    shutil.rmtree(UPLOAD_FOLDER)
    os.mkdir(UPLOAD_FOLDER)
    path = f"{UPLOAD_FOLDER}/{file.filename}"
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    manager.upload(file.filename)
    return {"path": f"uploads/{file.filename}"}


@app.get("/original")
async def get_original(request: Request):
    return {"path": f"uploads/{manager.get_cur_image()}"}

@app.get("/boundaries")
async def get_boundaries(request: Request):
    return {"path": f"uploads/{manager.get_sobel_image()}"}


@app.get("/linear_contrast")
async def get_linear_contrast(request: Request):
    return {"path": f"uploads/{manager.get_linear_contrast()}"}


@app.get("/histogram")
async def get_histogram(request: Request):
    return {"path": f"uploads/{manager.get_histogram()}"}


@app.get("/")
async def main_page(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request
    })

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8006)
