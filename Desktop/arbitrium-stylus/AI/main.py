from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv
from typing import List, Optional
import base64
load_dotenv()  # Load variables from .env
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

# ... (rest of your imports and code)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict to ["http://localhost:3000"] in production for security
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods, including OPTIONS and POST
    allow_headers=["*"],  # Allows all headers
)

# ... (rest of your code, like the ChatRequest class and @app.post("/chat"))

# Set your Groq API key
client = Groq(api_key=os.environ.get("GROQ_API_KEY", "YOUR_GROQ_API_KEY"))

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "AriAI Assistant API is running"}

class ChatRequest(BaseModel):
    message: str
    mode: str = "chat"
    code: str = ""
    file: str = ""
    sourceLanguage: str = "rust"
    targetLanguage: str = "solidity"
    attachments: Optional[List[dict]] = []

@app.post("/chat")
def chat(request: ChatRequest):
    # Process attachments if any
    attachment_context = ""
    if request.attachments:
        attachment_context = "\n\nAttached files context:\n"
        for attachment in request.attachments:
            attachment_context += f"- {attachment.get('name', 'Unknown file')} ({attachment.get('type', 'unknown type')}, {attachment.get('size', 0)} bytes)\n"
    
    if request.mode == "chat":
        system_prompt = "You are AriAI, a helpful coding assistant specialized in Arbitrum Stylus development. You help with Rust, Solidity, and C++ smart contracts. You can analyze attached files including images, PDFs, and text files. Provide clear, concise answers with code examples when helpful."
        user_prompt = request.message + attachment_context
    elif request.mode == "agent":
        system_prompt = f"You are AriAI, an AI code editor. Given the current code in file '{request.file}', edit it according to the user request. Consider any attached files for context. Output ONLY the complete modified code wrapped in ```{request.file.split('.')[-1]} code blocks, nothing else."
        user_prompt = f"Current code:\n{request.code}\n\nUser request: {request.message}{attachment_context}"
    else:  # migrate mode
        lang_extensions = {
            "rust": "rs", 
            "solidity": "sol", 
            "cpp": "cpp"
        }
        source_ext = lang_extensions.get(request.sourceLanguage, "txt")
        target_ext = lang_extensions.get(request.targetLanguage, "txt")
        
        system_prompt = f"You are AriAI, a smart contract migration specialist. Convert code from {request.sourceLanguage} to {request.targetLanguage} while maintaining functionality. Consider any attached files for additional context. Provide the converted code in ```{target_ext} blocks with explanatory comments about the conversion."
        user_prompt = request.message + attachment_context

    completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        model="openai/gpt-oss-20b",
        temperature=0.3 if request.mode == "agent" else 0.7,
        max_tokens=4096
    )
    return {"response": completion.choices[0].message.content}

@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    """Handle file uploads for AriAI Assistant"""
    uploaded_files = []
    
    for file in files:
        # Validate file type and size
        allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'text/markdown']
        max_size = 10 * 1024 * 1024  # 10MB
        
        if file.content_type not in allowed_types:
            continue
            
        content = await file.read()
        if len(content) > max_size:
            continue
            
        # For text files, decode content
        file_content = ""
        if file.content_type.startswith('text/'):
            try:
                file_content = content.decode('utf-8')
            except:
                file_content = "[Unable to decode text content]"
        elif file.content_type.startswith('image/'):
            # For images, encode as base64
            file_content = f"[Image: {file.filename}, base64 encoded]"
        elif file.content_type == 'application/pdf':
            file_content = f"[PDF: {file.filename}, {len(content)} bytes]"
            
        uploaded_files.append({
            'name': file.filename,
            'type': file.content_type,
            'size': len(content),
            'content': file_content
        })
    
    return {"files": uploaded_files}