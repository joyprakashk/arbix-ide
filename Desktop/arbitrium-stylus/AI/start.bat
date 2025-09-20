@echo off
echo Starting AriAI Assistant Backend...
echo.
echo Make sure you have set your GROQ_API_KEY in the .env file
echo.
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
pause