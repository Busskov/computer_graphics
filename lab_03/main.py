import uvicorn
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

TEMPLATES_FOLDER = 'templates'

app = FastAPI()
templates = Jinja2Templates(directory=TEMPLATES_FOLDER)

app.mount("/templates", StaticFiles(directory=TEMPLATES_FOLDER), name="templates")

@app.get("/")
async def main_page(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request
    })

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8006)
