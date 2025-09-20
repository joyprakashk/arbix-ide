# AriAI Assistant Backend

This is the backend API for the AriAI Assistant integrated into the Arbitrum Stylus IDE.

## Features

- **Chat Mode**: General coding assistance and debugging help
- **Agent Mode**: Direct code editing and modification
- **Migration Mode**: Convert code between Rust, Solidity, and C++
- **File Attachments**: Support for images, PDFs, and text files
- **CORS Enabled**: Works with the web frontend

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file with your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
```

3. Start the server:
```bash
# Windows
start.bat

# Or manually
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

### POST /chat
Main chat endpoint for AriAI interactions.

**Request Body:**
```json
{
  "message": "Your message here",
  "mode": "chat|agent|migrate",
  "code": "Current code (for agent mode)",
  "file": "Current filename",
  "sourceLanguage": "rust|solidity|cpp",
  "targetLanguage": "rust|solidity|cpp",
  "attachments": [
    {
      "name": "filename.txt",
      "type": "text/plain",
      "size": 1024
    }
  ]
}
```

### POST /upload
File upload endpoint for attachments.

**Supported File Types:**
- Images: JPEG, PNG, GIF
- Documents: PDF, TXT, MD
- Max size: 10MB per file

### GET /health
Health check endpoint.

## Usage with Frontend

The frontend automatically connects to `http://localhost:8000` when running locally. Make sure both the backend and frontend are running for full functionality.

## Error Handling

The API includes comprehensive error handling for:
- Invalid file types
- File size limits
- API key issues
- Network connectivity problems