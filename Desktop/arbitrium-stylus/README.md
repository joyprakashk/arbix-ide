# Arbitrum Stylus IDE

**Web-based development environment for Arbitrum Stylus smart contracts**

A comprehensive IDE featuring Monaco Editor, AriAI Assistant, gas profiling, debugging tools, and wallet integration for developing Rust-based WebAssembly smart contracts on Arbitrum.

## Features

- **Monaco Editor**: Full-featured code editor with Rust syntax highlighting
- **AriAI Assistant**: AI-powered coding assistant with file attachment support
- **Gas Profiler**: Analyze and optimize contract gas usage
- **Interactive Debugger**: Step-through debugging with breakpoints
- **Wallet Integration**: Connect MetaMask and other Web3 wallets
- **Contract Deployment**: Deploy to Arbitrum Sepolia testnet
- **Test Runner**: Execute and visualize test results
- **Git Integration**: Source control management
- **LearnARB**: Educational resources and tutorials

## Tech Stack

### Frontend (Web IDE)
- **React** 18.2.0 - UI framework
- **Monaco Editor** 4.6.0 - Code editor
- **Ethers.js** 6.8.0 - Ethereum library
- **Web3.js** 4.3.0 - Web3 interactions
- **Axios** 1.6.0 - HTTP client

### Backend (AriAI Assistant)
- **FastAPI** 0.104.1 - Python web framework
- **Groq** 0.4.1 - AI model integration
- **Uvicorn** 0.24.0 - ASGI server
- **Python-multipart** 0.0.6 - File upload support

## Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.8+ and pip
- **Web3 Wallet** (MetaMask recommended)
- **Groq API Key** (for AriAI Assistant)

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/arbitrium-stylus
cd arbitrium-stylus
```

### 2. Setup Backend (AriAI Assistant)
```bash
cd AI

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env
```

### 3. Setup Frontend (Web IDE)
```bash
cd ../web

# Install Node.js dependencies
npm install
```

## Running the Application

### Start Backend Server
```bash
cd AI

# Option 1: Use the batch script (Windows)
start.bat

# Option 2: Manual start
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Start Frontend Development Server
```bash
cd web
npm start
```

The application will be available at:
- **Web IDE**: http://localhost:3000
- **Backend API**: http://localhost:8000

## Project Structure

```
arbitrium-stylus/
├── AI/                     # Backend (AriAI Assistant)
│   ├── main.py            # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   ├── .env              # Environment variables
│   └── start.bat         # Windows startup script
├── web/                   # Frontend (React IDE)
│   ├── src/
│   │   ├── App.js        # Main application
│   │   ├── App.css       # Styles
│   │   └── components/   # React components
│   ├── package.json      # Node.js dependencies
│   └── public/           # Static assets
├── core/                  # Rust execution engine
├── harness/              # Test framework
├── cli/                  # Command-line tools
├── examples/             # Sample contracts
└── .github/              # CI/CD workflows
```

## Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" in the top-right corner
- Approve the connection in your Web3 wallet
- Supported wallets: MetaMask, OKX Wallet, Coinbase Wallet

### 2. Write Smart Contracts
- Use the Monaco Editor with Rust syntax highlighting
- Access file explorer in the left sidebar
- Create new files and organize your project

### 3. Use AriAI Assistant
- Click the robot icon (🤖) in the activity bar
- Choose from three modes:
  - **Chat**: General coding assistance
  - **Agent**: Direct code editing
  - **Migrate**: Convert between Rust, Solidity, and C++
- Attach files (images, PDFs, text) for context

### 4. Test and Debug
- Click "Test" to run unit tests
- Use "Debug" for step-through debugging
- Set breakpoints by clicking line numbers

### 5. Deploy Contracts
- Click "Deploy" to deploy to Arbitrum Sepolia
- Interact with deployed contracts using the interaction panel

### 6. Profile Gas Usage
- Click "Profile" to analyze gas consumption
- View detailed breakdowns and optimization suggestions

## Configuration

### Environment Variables (.env)
```bash
# Required for AriAI Assistant
GROQ_API_KEY=your_groq_api_key_here
```

### Supported File Types (AriAI)
- **Images**: JPEG, PNG, GIF (max 10MB)
- **Documents**: PDF, TXT, MD (max 10MB)

## API Endpoints

### Backend API (http://localhost:8000)
- `POST /chat` - AriAI chat interactions
- `POST /upload` - File upload for attachments
- `GET /health` - Health check

## Development

### Frontend Development
```bash
cd web
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Backend Development
```bash
cd AI
uvicorn main:app --reload  # Start with auto-reload
```

## Troubleshooting

### Common Issues

1. **MetaMask Connection Error**
   - Ensure MetaMask is installed and unlocked
   - Check browser console for detailed errors
   - Try refreshing the page

2. **AriAI Not Responding**
   - Verify backend server is running on port 8000
   - Check GROQ_API_KEY is set correctly
   - Ensure no firewall blocking localhost:8000

3. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

### Terminal Messages
The IDE uses professional logging with timestamps:
- `INFO:` - General information
- `ERROR:` - Error messages
- `BUILD:` - Compilation messages
- `TEST:` - Test execution
- `DEPLOY:` - Contract deployment
- `DEBUG:` - Debugging operations

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.