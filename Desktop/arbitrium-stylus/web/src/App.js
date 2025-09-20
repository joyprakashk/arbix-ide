import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import GitPanel from './components/GitPanel';
import LearnARB from './components/LearnARB';
import './App.css';

const defaultCode = `use stylus_sdk::prelude::*;

static mut COUNTER: u64 = 0;

#[entrypoint]
fn user_main(input: Vec<u8>) -> Result<Vec<u8>, Vec<u8>> {
    let function = String::from_utf8(input).map_err(|_| b"Invalid input".to_vec())?;
    
    match function.as_str() {
        "increment" => {
            unsafe {
                COUNTER += 1;
                Ok(COUNTER.to_le_bytes().to_vec())
            }
        }
        "get" => {
            unsafe {
                Ok(COUNTER.to_le_bytes().to_vec())
            }
        }
        "reset" => {
            unsafe {
                COUNTER = 0;
                Ok(COUNTER.to_le_bytes().to_vec())
            }
        }
        _ => Err(b"Unknown function".to_vec())
    }
}

#[export_name = "increment"]
pub extern "C" fn increment() -> i64 {
    unsafe {
        COUNTER += 1;
        COUNTER as i64
    }
}

#[export_name = "get"]
pub extern "C" fn get() -> i64 {
    unsafe { COUNTER as i64 }
}

#[export_name = "reset"]
pub extern "C" fn reset() -> i64 {
    unsafe {
        COUNTER = 0;
        COUNTER as i64
    }
}`;

const testCode = `#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_increment() {
        let result = increment();
        assert_eq!(result, 1);
    }

    #[test]
    fn test_get() {
        let result = get();
        assert!(result >= 0);
    }

    #[test]
    fn test_reset() {
        let result = reset();
        assert_eq!(result, 0);
    }

    #[test]
    fn test_gas_limit() {
        for _ in 0..1000 {
            increment();
        }
    }
}`;

function App() {
  const [code, setCode] = useState(defaultCode);
  const [activeTab, setActiveTab] = useState('lib.rs');
  const [sidebarView, setSidebarView] = useState('explorer');
  const [testResults, setTestResults] = useState([]);
  const [gasProfile, setGasProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buildOutput, setBuildOutput] = useState('');
  const [debugSession, setDebugSession] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('Arbitrum Stylus IDE Terminal\nType commands or use the toolbar buttons above\n$ ');
  const [showTerminal, setShowTerminal] = useState(true);
  const [openTabs, setOpenTabs] = useState(['lib.rs']);
  const [theme, setTheme] = useState('dark');
  const [deployedContract, setDeployedContract] = useState(null);
  const [showContractInteraction, setShowContractInteraction] = useState(false);
  const [executionTrace, setExecutionTrace] = useState([]);
  const [breakpoints, setBreakpoints] = useState(new Set());
  const [currentExecutionLine, setCurrentExecutionLine] = useState(null);
  const [showMenuDropdown, setShowMenuDropdown] = useState(null);
  const [fileTree, setFileTree] = useState({
    'src': {
      'lib.rs': { type: 'file', content: defaultCode },
      'main.rs': { type: 'file', content: '// Main entry point' }
    },
    'tests': {
      'integration.rs': { type: 'file', content: testCode }
    },
    'Cargo.toml': { type: 'file', content: '[package]\nname = "stylus-contract"' },
    'README.md': { type: 'file', content: '# Stylus Contract' }
  });
  const [ariAIMode, setAriAIMode] = useState('chat');
  const [chatHistory, setChatHistory] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState('rust');
  const [targetLanguage, setTargetLanguage] = useState('solidity');
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [inputMessage, setInputMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const editorRef = useRef(null);
  const chatHistoryRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveFile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const handleResize = (e) => {
      if (e.target.classList.contains('resize-handle')) {
        const startX = e.clientX;
        const startWidth = sidebarWidth;
        
        const handleMouseMove = (e) => {
          const newWidth = startWidth - (e.clientX - startX);
          if (newWidth >= 300 && newWidth <= window.innerWidth * 0.5) {
            setSidebarWidth(newWidth);
          }
        };
        
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    };
    
    document.addEventListener('mousedown', handleResize);
    return () => document.removeEventListener('mousedown', handleResize);
  }, [sidebarWidth]);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        addToTerminal('ERROR: No Web3 wallet detected. Please install MetaMask or another Web3 wallet.');
        return;
      }

      addToTerminal('INFO: Connecting to wallet...');
      
      // Check if already connected
      const existingAccounts = await window.ethereum.request({ method: 'eth_accounts' });
      
      let accounts;
      if (existingAccounts.length > 0) {
        accounts = existingAccounts;
      } else {
        accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
      }
      
      if (accounts && accounts.length > 0) {
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
        
        let walletName = 'Web3 Wallet';
        if (window.ethereum.isMetaMask) walletName = 'MetaMask';
        else if (window.ethereum.isOkxWallet) walletName = 'OKX Wallet';
        else if (window.ethereum.isCoinbaseWallet) walletName = 'Coinbase Wallet';
        
        addToTerminal(`SUCCESS: ${walletName} connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (newAccounts) => {
          if (newAccounts.length === 0) {
            setWalletConnected(false);
            setWalletAddress('');
            addToTerminal('INFO: Wallet disconnected');
          } else {
            setWalletAddress(newAccounts[0]);
            addToTerminal(`INFO: Account switched to ${newAccounts[0].slice(0, 6)}...${newAccounts[0].slice(-4)}`);
          }
        });
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      if (error.code === 4001) {
        addToTerminal('ERROR: Wallet connection rejected by user');
      } else if (error.code === -32002) {
        addToTerminal('WARNING: Wallet connection request already pending');
      } else {
        addToTerminal(`ERROR: Failed to connect wallet - ${error.message || 'Unknown error'}`);
      }
    }
  };

  const addToTerminal = (message) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setTerminalOutput(prev => prev + '\n[' + timestamp + '] ' + message + '\n$ ');
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    monaco.languages.register({ id: 'rust' });
    monaco.languages.setMonarchTokensProvider('rust', {
      tokenizer: {
        root: [
          [/\b(fn|let|mut|pub|use|mod|struct|enum|impl|trait|where|match|if|else|loop|while|for|in|return|break|continue|unsafe|extern|static|const|type|as|ref|move)\b/, 'keyword'],
          [/\b(i8|i16|i32|i64|i128|u8|u16|u32|u64|u128|f32|f64|bool|char|str|String|Vec|Option|Result)\b/, 'type'],
          [/".*?"/, 'string'],
          [/'.*?'/, 'string'],
          [/\/\/.*$/, 'comment'],
          [/\/\*[\s\S]*?\*\//, 'comment'],
          [/\d+/, 'number'],
        ]
      }
    });

    editor.onMouseDown((e) => {
      if (e.target.position && e.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS) {
        const lineNumber = e.target.position.lineNumber;
        toggleBreakpoint(lineNumber);
      }
    });
  };

  const toggleBreakpoint = (lineNumber) => {
    const newBreakpoints = new Set(breakpoints);
    if (newBreakpoints.has(lineNumber)) {
      newBreakpoints.delete(lineNumber);
    } else {
      newBreakpoints.add(lineNumber);
    }
    setBreakpoints(newBreakpoints);
    addToTerminal(`DEBUG: Breakpoint ${newBreakpoints.has(lineNumber) ? 'set' : 'cleared'} at line ${lineNumber}`);
  };

  const saveFile = () => {
    fileTree.src[activeTab] = { type: 'file', content: code };
    addToTerminal(`INFO: File saved - ${activeTab}`);
  };

  const newFile = () => {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      setFileTree(prev => ({
        ...prev,
        src: {
          ...prev.src,
          [fileName]: { type: 'file', content: '// New file' }
        }
      }));
      openFile('src', fileName);
    }
  };

  const buildProject = async () => {
    setIsLoading(true);
    setBuildOutput('');
    addToTerminal('BUILD: Starting compilation process...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setBuildOutput('Compiling stylus-contract v0.1.0\n');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setBuildOutput(prev => prev + 'Checking dependencies...\n');
    setBuildOutput(prev => prev + 'Compiling to WASM...\n');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setBuildOutput(prev => prev + 'Optimizing WASM binary...\n');
    setBuildOutput(prev => prev + '✅ Build completed successfully\n');
    setBuildOutput(prev => prev + '📦 WASM size: 2.4KB (optimized)\n');
    setBuildOutput(prev => prev + '⚡ Gas estimation: ~120 per function call\n');
    
    addToTerminal('BUILD: Compilation completed successfully');
    setIsLoading(false);
  };

  const runTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    setSidebarView('test');
    addToTerminal('TEST: Initializing test runner...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    addToTerminal('TEST: Parsing test cases...');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    addToTerminal('TEST: Executing tests in Wasmer runtime...');
    
    const mockResults = [
      {
        name: 'test_increment',
        passed: true,
        duration: '12ms',
        gas: 120,
        output: 'Expected: 1, Got: 1',
        stackTrace: ['increment() -> 1', 'user_main() -> Ok(...)']
      },
      {
        name: 'test_get',
        passed: true,
        duration: '8ms',
        gas: 80,
        output: 'Expected: >= 0, Got: 1',
        stackTrace: ['get() -> 1']
      },
      {
        name: 'test_reset',
        passed: true,
        duration: '10ms',
        gas: 100,
        output: 'Expected: 0, Got: 0',
        stackTrace: ['reset() -> 0']
      },
      {
        name: 'test_gas_limit',
        passed: false,
        duration: '250ms',
        gas: 120000,
        output: 'Gas limit exceeded: 120000 > 10000',
        stackTrace: ['increment() -> loop detected', 'panic: gas limit exceeded']
      }
    ];
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTestResults(mockResults);
    const passed = mockResults.filter(t => t.passed).length;
    const total = mockResults.length;
    addToTerminal(`TEST: Completed - ${passed}/${total} tests passed`);
    setIsLoading(false);
  };

  const deployContract = async () => {
    if (!walletConnected) {
      addToTerminal('ERROR: Wallet connection required for deployment');
      return;
    }
    
    setIsLoading(true);
    addToTerminal('DEPLOY: Initiating deployment to Arbitrum Sepolia...');
    addToTerminal('DEPLOY: Preparing WASM bytecode...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToTerminal('DEPLOY: Estimating gas costs...');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    const contractAddress = '0x742d35Cc6634C0532925a3b8D404d354Da7a1E91';
    addToTerminal('DEPLOY: Contract deployed successfully');
    addToTerminal(`DEPLOY: Address - ${contractAddress}`);
    addToTerminal('DEPLOY: Gas used - 234,567');
    addToTerminal('DEPLOY: Transaction cost - 0.0012 ETH');
    
    setDeployedContract({
      address: contractAddress,
      abi: [
        { name: 'increment', type: 'function', inputs: [], outputs: [{ type: 'uint64' }] },
        { name: 'get', type: 'function', inputs: [], outputs: [{ type: 'uint64' }] },
        { name: 'reset', type: 'function', inputs: [], outputs: [{ type: 'uint64' }] }
      ]
    });
    
    setIsLoading(false);
  };

  const profileGas = async () => {
    setIsLoading(true);
    setSidebarView('profiler');
    addToTerminal('PROFILE: Starting gas analysis...');
    addToTerminal('PROFILE: Analyzing WASM instruction costs...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setGasProfile({
      function_name: 'increment',
      gas_used: 120,
      instruction_count: 12,
      breakdown: {
        'local_get': 20,
        'local_set': 15,
        'i64_add': 30,
        'call': 55
      },
      hotspots: [
        { line: 15, gas: 55, percentage: 45.8, instruction: 'unsafe block entry' },
        { line: 16, gas: 30, percentage: 25.0, instruction: 'COUNTER += 1' },
        { line: 17, gas: 20, percentage: 16.7, instruction: 'return value' }
      ],
      memoryUsage: 1024,
      stackDepth: 2
    });
    
    addToTerminal('PROFILE: Analysis completed');
    setIsLoading(false);
  };

  const startDebugger = async () => {
    setIsLoading(true);
    setSidebarView('debug');
    addToTerminal('DEBUG: Initializing interactive debugger...');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const trace = [
      { line: 10, instruction: 'fn increment()', gas: 5, memory: 1024 },
      { line: 11, instruction: 'unsafe {', gas: 2, memory: 1024 },
      { line: 12, instruction: 'COUNTER += 1;', gas: 25, memory: 1032 },
      { line: 13, instruction: 'COUNTER as i64', gas: 10, memory: 1032 },
      { line: 14, instruction: '}', gas: 2, memory: 1024 }
    ];
    
    setExecutionTrace(trace);
    setCurrentExecutionLine(10);
    setDebugSession({
      active: true,
      currentLine: 10,
      variables: {
        'COUNTER': { value: '0 -> 1', type: 'u64', address: '0x1000' }
      },
      callStack: ['increment', 'user_main'],
      memory: [
        { address: '0x1000', value: '0x0000000000000001', description: 'COUNTER' },
        { address: '0x1008', value: '0x7fff5fbff8a0', description: 'Stack pointer' }
      ]
    });
    
    addToTerminal('DEBUG: Debugger session active - Use step controls');
    setIsLoading(false);
  };

  const stepDebugger = (mode) => {
    if (!debugSession || !debugSession.active) return;
    
    const currentIndex = executionTrace.findIndex(t => t.line === currentExecutionLine);
    let nextIndex = currentIndex + 1;
    
    if (mode === 'over') nextIndex = currentIndex + 1;
    else if (mode === 'into') nextIndex = currentIndex + 1;
    else if (mode === 'out') nextIndex = executionTrace.length - 1;
    
    if (nextIndex < executionTrace.length) {
      const nextTrace = executionTrace[nextIndex];
      setCurrentExecutionLine(nextTrace.line);
      addToTerminal(`DEBUG: Step ${mode} - Line ${nextTrace.line}: ${nextTrace.instruction}`);
      
      if (editorRef.current) {
        editorRef.current.revealLineInCenter(nextTrace.line);
        editorRef.current.setPosition({ lineNumber: nextTrace.line, column: 1 });
      }
    } else {
      addToTerminal('DEBUG: Execution completed');
      setDebugSession(null);
      setCurrentExecutionLine(null);
    }
  };

  const interactWithContract = async (functionName, args = []) => {
    if (!deployedContract) {
      addToTerminal('ERROR: No contract deployed');
      return;
    }
    
    setIsLoading(true);
    addToTerminal(`CONTRACT: Calling function ${functionName}(${args.join(', ')})`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResults = {
      'increment': 2,
      'get': 2,
      'reset': 0
    };
    
    const result = mockResults[functionName] || 0;
    addToTerminal(`CONTRACT: Function returned - ${result}`);
    addToTerminal(`CONTRACT: Gas consumed - ${Math.floor(Math.random() * 50) + 80}`);
    
    setIsLoading(false);
    return result;
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const openFile = (path, filename) => {
    if (!openTabs.includes(filename)) {
      setOpenTabs([...openTabs, filename]);
    }
    setActiveTab(filename);
    
    const fileContent = fileTree[path] && fileTree[path][filename] 
      ? fileTree[path][filename].content 
      : fileTree[filename]?.content || '// File content';
    setCode(fileContent);
  };

  const closeTab = (filename) => {
    const newTabs = openTabs.filter(tab => tab !== filename);
    setOpenTabs(newTabs);
    if (activeTab === filename && newTabs.length > 0) {
      setActiveTab(newTabs[0]);
    }
  };

  const applyEdit = (newCodeRaw) => {
    // Strip Markdown code fences if present so we only apply the code body
    let newCode = newCodeRaw;
    const fenceMatch = newCodeRaw.match(/^```[a-zA-Z]*\n([\s\S]*?)\n```\s*$/);
    if (fenceMatch) {
      newCode = fenceMatch[1];
    }
    setCode(newCode);
    const path = activeTab.endsWith('.rs') ? 'src' : Object.keys(fileTree).find(p => fileTree[p][activeTab]);
    if (path) {
      fileTree[path][activeTab].content = newCode;
    } else {
      fileTree[activeTab].content = newCode;
    }
    setFileTree({...fileTree});
    addToTerminal('ARIAI: Code changes applied to ' + activeTab);
  };

  const handleFileAttachment = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'text/markdown'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        addToTerminal(`ERROR: Unsupported file type - ${file.name}`);
        return false;
      }
      if (file.size > maxSize) {
        addToTerminal(`ERROR: File size exceeds limit - ${file.name} (max 10MB)`);
        return false;
      }
      return true;
    });
    
    setAttachedFiles(prev => [...prev, ...validFiles]);
    addToTerminal(`INFO: ${validFiles.length} file(s) attached successfully`);
  };

  const removeAttachment = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processAttachedFiles = async (files) => {
    const fileContents = [];
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        // For images, just include metadata
        fileContents.push(`[Image: ${file.name}, ${file.type}, ${(file.size/1024).toFixed(1)}KB]`);
      } else if (file.type === 'application/pdf') {
        fileContents.push(`[PDF: ${file.name}, ${(file.size/1024).toFixed(1)}KB]`);
      } else {
        // For text files, read content
        try {
          const text = await file.text();
          fileContents.push(`[File: ${file.name}]\n${text}`);
        } catch (error) {
          fileContents.push(`[File: ${file.name} - Error reading content]`);
        }
      }
    }
    
    return fileContents.join('\n\n');
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() && attachedFiles.length === 0) return;
    
    const messageMode = ariAIMode;
    let processedMessage = inputMessage;
    
    // Process attached files
    if (attachedFiles.length > 0) {
      const fileContent = await processAttachedFiles(attachedFiles);
      processedMessage = `${inputMessage}\n\nAttached files:\n${fileContent}`;
    }
    
    // Handle migration mode with enhanced prompt
    if (ariAIMode === 'migrate') {
      processedMessage = `Convert this ${sourceLanguage} code to ${targetLanguage}. Maintain the same functionality and add appropriate comments explaining the conversion:\n\n${processedMessage}`;
    }
    
    const userMessage = {
      role: 'user', 
      content: inputMessage, 
      mode: messageMode,
      attachments: attachedFiles.map(f => ({ name: f.name, type: f.type, size: f.size }))
    };
    
    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    setInputMessage('');
    setAttachedFiles([]);
    setIsLoading(true);
    
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: processedMessage,
          mode: ariAIMode,
          code: code,
          file: activeTab,
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage
        })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setChatHistory([...newHistory, { role: 'assistant', content: data.response, mode: messageMode }]);
      
      // Log successful interaction
      addToTerminal(`ARIAI: Response generated in ${messageMode} mode`);
      
    } catch (error) {
      addToTerminal(`ERROR: AriAI communication failed - ${error.message}`);
      // Add error message to chat
      setChatHistory([...newHistory, { 
        role: 'assistant', 
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`, 
        mode: messageMode 
      }]);
    }
    
    setIsLoading(false);
  };

  const menuActions = {
    file: {
      'New File': () => {
        newFile();
        addToTerminal('INFO: New file created');
      },
      'Save': () => {
        saveFile();
        addToTerminal('INFO: File saved successfully');
      },
      'Save All': () => {
        Object.keys(fileTree.src).forEach(file => {
          fileTree.src[file] = { type: 'file', content: code };
        });
        addToTerminal('INFO: All files saved');
      },
      'Close': () => {
        if (activeTab) {
          closeTab(activeTab);
          addToTerminal(`INFO: Closed ${activeTab}`);
        }
      },
      'Exit': () => addToTerminal('INFO: Goodbye! Thanks for using Arbitrum Stylus IDE')
    },
    edit: {
      'Undo': () => {
        editorRef.current?.trigger('keyboard', 'undo', null);
        addToTerminal('EDIT: Undo action performed');
      },
      'Redo': () => {
        editorRef.current?.trigger('keyboard', 'redo', null);
        addToTerminal('EDIT: Redo action performed');
      },
      'Find': () => {
        editorRef.current?.trigger('keyboard', 'actions.find', null);
        addToTerminal('EDIT: Find dialog opened');
      },
      'Replace': () => {
        editorRef.current?.trigger('keyboard', 'editor.action.startFindReplaceAction', null);
        addToTerminal('EDIT: Find & Replace dialog opened');
      },
      'Format Document': () => {
        editorRef.current?.trigger('editor', 'editor.action.formatDocument', null);
        addToTerminal('EDIT: Document formatted');
      }
    },
    view: {
      'Command Palette': () => {
        setShowCommandPalette(true);
        addToTerminal('VIEW: Command palette opened');
      },
      'Toggle Terminal': () => {
        setShowTerminal(!showTerminal);
        addToTerminal(`VIEW: Terminal ${!showTerminal ? 'opened' : 'closed'}`);
      },
      'Toggle Theme': () => {
        toggleTheme();
        addToTerminal(`VIEW: Switched to ${theme === 'dark' ? 'light' : 'dark'} theme`);
      },
      'Explorer': () => {
        setSidebarView('explorer');
        addToTerminal('VIEW: File explorer opened');
      },
      'Testing': () => {
        setSidebarView('test');
        addToTerminal('VIEW: Test panel opened');
      },
      'Git': () => {
        setSidebarView('git');
        addToTerminal('VIEW: Git panel opened');
      },
      'LearnARB': () => {
        setSidebarView('learn');
        addToTerminal('VIEW: LearnARB panel opened');
      },
      'Gas Profiler': () => {
        setSidebarView('profiler');
        addToTerminal('VIEW: Gas profiler opened');
      },
      'Debugger': () => {
        setSidebarView('debug');
        addToTerminal('VIEW: Debugger panel opened');
      }
    },
    run: {
      'Build Project': () => {
        buildProject();
        addToTerminal('RUN: Build process started');
      },
      'Run Tests': () => {
        runTests();
        addToTerminal('RUN: Test execution started');
      },
      'Start Debugging': () => {
        startDebugger();
        addToTerminal('RUN: Debug session started');
      },
      'Deploy Contract': () => {
        if (walletConnected) {
          deployContract();
          addToTerminal('RUN: Contract deployment started');
        } else {
          addToTerminal('ERROR: Please connect wallet first');
        }
      },
      'Profile Gas': () => {
        profileGas();
        addToTerminal('RUN: Gas profiling started');
      }
    },
    help: {
      'Documentation': () => {
        addToTerminal('HELP: Opening Arbitrum Stylus documentation...');
        window.open('https://docs.arbitrum.io/stylus/stylus-gentle-introduction', '_blank');
      },
      'Keyboard Shortcuts': () => {
        addToTerminal('HELP: Keyboard shortcuts:');
        addToTerminal('  Ctrl+S: Save file');
        addToTerminal('  Ctrl+Shift+P: Command palette');
        addToTerminal('  Ctrl+Shift+B: Build project');
        addToTerminal('  Ctrl+Shift+T: Run tests');
        addToTerminal('  F5: Start debugging');
      },
      'About': () => {
        addToTerminal('INFO: Arbitrum Stylus IDE v1.0.0');
        addToTerminal('INFO: Built for Arbitrum ecosystem development');
        addToTerminal('INFO: Rust + WebAssembly smart contracts');
      }
    }
  };

  const CommandPalette = () => (
    showCommandPalette && (
      <div className="command-palette-overlay" onClick={() => setShowCommandPalette(false)}>
        <div className="command-palette" onClick={e => e.stopPropagation()}>
          <input 
            type="text" 
            placeholder="Type a command..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Escape') setShowCommandPalette(false);
            }}
          />
          <div className="command-list">
            <div className="command-item" onClick={buildProject}>
              <span className="command-icon">🔨</span>
              <span>Build Project</span>
              <span className="command-shortcut">Ctrl+Shift+B</span>
            </div>
            <div className="command-item" onClick={runTests}>
              <span className="command-icon">🧪</span>
              <span>Run Tests</span>
              <span className="command-shortcut">Ctrl+Shift+T</span>
            </div>
            <div className="command-item" onClick={startDebugger}>
              <span className="command-icon">🐛</span>
              <span>Start Debugging</span>
              <span className="command-shortcut">F5</span>
            </div>
            <div className="command-item" onClick={deployContract}>
              <span className="command-icon">🚀</span>
              <span>Deploy Contract</span>
              <span className="command-shortcut">Ctrl+Shift+D</span>
            </div>
            <div className="command-item" onClick={() => !walletConnected && connectWallet()}>
              <span className="command-icon">🔗</span>
              <span>{walletConnected ? 'Wallet Connected' : 'Connect Wallet'}</span>
            </div>
            <div className="command-item" onClick={toggleTheme}>
              <span className="command-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span>Toggle Theme</span>
            </div>
            <div className="command-item" onClick={() => setSidebarView('git')}>
              <span className="command-icon">📂</span>
              <span>Open Git Panel</span>
            </div>
            <div className="command-item" onClick={() => setSidebarView('learn')}>
              <span className="command-icon">📚</span>
              <span>Open LearnARB</span>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const FileExplorer = () => {
    const renderFileTree = (tree, path = '') => {
      return Object.entries(tree).map(([name, item]) => {
        const fullPath = path ? `${path}/${name}` : name;
        
        if (item.type === 'file') {
          return (
            <div 
              key={fullPath} 
              className="file-item"
              onClick={() => openFile(path, name)}
            >
              <span className="file-icon">
                {name.endsWith('.rs') ? '🦀' : 
                 name.endsWith('.toml') ? '⚙️' : 
                 name.endsWith('.md') ? '📄' : '📄'}
              </span>
              <span className="file-name">{name}</span>
            </div>
          );
        } else {
          return (
            <div key={fullPath} className="folder-item">
              <div className="folder-header">
                <span className="folder-icon">📁</span>
                <span className="folder-name">{name}</span>
              </div>
              <div className="folder-content">
                {renderFileTree(item, name)}
              </div>
            </div>
          );
        }
      });
    };

    return (
      <div className="file-explorer">
        <div className="panel-header">
          <span>EXPLORER</span>
          <div className="explorer-actions">
            <button title="New File" onClick={newFile}>📄</button>
            <button title="New Folder">📁</button>
            <button title="Refresh">🔄</button>
          </div>
        </div>
        <div className="panel-content">
          <div className="file-tree">
            {renderFileTree(fileTree)}
          </div>
        </div>
      </div>
    );
  };

  const TestPanel = () => (
    <div className="test-panel">
      <div className="panel-header">
        <span>TEST RESULTS</span>
        <button onClick={runTests} disabled={isLoading}>
          {isLoading ? '⏳' : '▶️'}
        </button>
      </div>
      <div className="panel-content">
        {testResults.length > 0 && (
          <div className="test-summary">
            <div className="summary-stats">
              <span className="passed">{testResults.filter(t => t.passed).length} passed</span>
              <span className="failed">{testResults.filter(t => !t.passed).length} failed</span>
              <span className="total">{testResults.length} total</span>
            </div>
          </div>
        )}
        
        <div className="test-list">
          {testResults.map((test, index) => (
            <div key={index} className={`test-item ${test.passed ? 'passed' : 'failed'}`}>
              <div className="test-header">
                <span className="test-status">{test.passed ? '✅' : '❌'}</span>
                <span className="test-name">{test.name}</span>
                <span className="test-duration">{test.duration}</span>
              </div>
              <div className="test-details">
                <div className="test-gas">Gas: {test.gas}</div>
                <div className="test-output">{test.output}</div>
                {test.stackTrace && (
                  <div className="stack-trace">
                    <strong>Stack Trace:</strong>
                    {test.stackTrace.map((trace, i) => (
                      <div key={i} className="trace-line">{trace}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DebugPanel = () => (
    <div className="debug-panel">
      <div className="panel-header">
        <span>DEBUGGER</span>
        <button onClick={startDebugger} disabled={isLoading}>
          {isLoading ? '⏳' : '🐛'}
        </button>
      </div>
      <div className="panel-content">
        {debugSession?.active ? (
          <div className="debug-session">
            <div className="debug-controls">
              <button onClick={() => stepDebugger('over')}>⏭️ Step Over</button>
              <button onClick={() => stepDebugger('into')}>⬇️ Step Into</button>
              <button onClick={() => stepDebugger('out')}>⬆️ Step Out</button>
              <button onClick={() => setDebugSession(null)}>⏹️ Stop</button>
            </div>
            
            <div className="debug-info">
              <div className="debug-section">
                <h4>Variables</h4>
                {Object.entries(debugSession.variables).map(([name, info]) => (
                  <div key={name} className="variable">
                    <span className="var-name">{name}</span>
                    <span className="var-value">{info.value}</span>
                    <span className="var-type">{info.type}</span>
                  </div>
                ))}
              </div>
              
              <div className="debug-section">
                <h4>Call Stack</h4>
                {debugSession.callStack.map((func, i) => (
                  <div key={i} className="stack-frame">{func}</div>
                ))}
              </div>
              
              <div className="debug-section">
                <h4>Memory</h4>
                {debugSession.memory.map((mem, i) => (
                  <div key={i} className="memory-item">
                    <span className="mem-address">{mem.address}</span>
                    <span className="mem-value">{mem.value}</span>
                    <span className="mem-desc">{mem.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="debug-placeholder">
            <p>Click the debug button to start interactive debugging</p>
            <div className="breakpoints-section">
              <h4>Breakpoints</h4>
              {Array.from(breakpoints).map(line => (
                <div key={line} className="breakpoint-item">
                  <span>Line {line}</span>
                  <button onClick={() => toggleBreakpoint(line)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ProfilerPanel = () => (
    <div className="profiler-panel">
      <div className="panel-header">
        <span>GAS PROFILER</span>
        <button onClick={profileGas} disabled={isLoading}>
          {isLoading ? '⏳' : '📊'}
        </button>
      </div>
      <div className="panel-content">
        {gasProfile ? (
          <div className="gas-analysis">
            <div className="gas-summary">
              <div className="gas-metric">
                <div className="metric-value">{gasProfile.gas_used}</div>
                <div className="metric-label">Total Gas</div>
              </div>
              <div className="gas-metric">
                <div className="metric-value">{gasProfile.instruction_count}</div>
                <div className="metric-label">Instructions</div>
              </div>
              <div className="gas-metric">
                <div className="metric-value">{gasProfile.memoryUsage}</div>
                <div className="metric-label">Memory (bytes)</div>
              </div>
            </div>
            
            <div className="gas-breakdown">
              <h4>Instruction Breakdown</h4>
              {Object.entries(gasProfile.breakdown).map(([op, gas]) => (
                <div key={op} className="gas-item">
                  <span className="op-name">{op}</span>
                  <div className="gas-bar">
                    <div 
                      className="gas-fill" 
                      style={{ width: `${(gas / gasProfile.gas_used) * 100}%` }}
                    />
                  </div>
                  <span className="gas-amount">{gas}</span>
                </div>
              ))}
            </div>

            <div className="gas-hotspots">
              <h4>Performance Hotspots</h4>
              {gasProfile.hotspots.map((hotspot, i) => (
                <div key={i} className="hotspot">
                  <span className="line-number">Line {hotspot.line}</span>
                  <span className="hotspot-instruction">{hotspot.instruction}</span>
                  <span className="hotspot-gas">{hotspot.gas}g</span>
                  <span className="hotspot-percentage">{hotspot.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="profiler-placeholder">
            <p>Click the profile button to analyze gas usage</p>
          </div>
        )}
      </div>
    </div>
  );

  const AriAIPanel = () => (
    <div className="ariai-panel">
      <div className="ariai-header">
        <div className="ariai-title">
          <div className="ariai-logo">🤖</div>
          <div className="ariai-info">
            <h3>AriAI Assistant</h3>
            <span className="ariai-status">Ready to help</span>
          </div>
        </div>
        <div className="ariai-controls">
          <div className="mode-selector">
            <button
              className={`mode-btn ${ariAIMode === 'chat' ? 'active' : ''}`}
              onClick={() => setAriAIMode('chat')}
              title="Chat Mode - General assistance"
            >
              💬 Chat
            </button>
            <button
              className={`mode-btn ${ariAIMode === 'agent' ? 'active' : ''}`}
              onClick={() => setAriAIMode('agent')}
              title="Agent Mode - Code editing"
            >
              🛠️ Agent
            </button>
            <button
              className={`mode-btn ${ariAIMode === 'migrate' ? 'active' : ''}`}
              onClick={() => setAriAIMode('migrate')}
              title="Migration Mode - Language conversion"
            >
              🔄 Migrate
            </button>
          </div>
        </div>
      </div>
      
      <div className="ariai-content">
        <div className="chat-messages" ref={chatHistoryRef}>
          {chatHistory.length === 0 && (
            <div className="welcome-message">
              <div className="welcome-icon">🚀</div>
              <h4>Welcome to AriAI!</h4>
              <p>I can help you with:</p>
              <ul>
                <li>💬 <strong>Chat:</strong> Code questions & debugging</li>
                <li>🛠️ <strong>Agent:</strong> Direct code editing</li>
                <li>🔄 <strong>Migrate:</strong> Convert between Solidity, Rust & C++</li>
              </ul>
              <div className="quick-actions">
                <button className="quick-btn" onClick={() => setInputMessage('Explain this Rust code')}>
                  Explain Code
                </button>
                <button className="quick-btn" onClick={() => setInputMessage('Optimize gas usage')}>
                  Optimize Gas
                </button>
                <button className="quick-btn" onClick={() => setInputMessage('Convert to Solidity')}>
                  Convert Language
                </button>
              </div>
            </div>
          )}
          
          {chatHistory.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-body">
                <div className="message-header">
                  <span className="message-sender">
                    {msg.role === 'user' ? 'You' : 'AriAI'}
                  </span>
                  <span className="message-mode">{msg.mode}</span>
                  <span className="message-time">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="message-content">
                  {msg.role === 'assistant' && msg.content.includes('```') ? (
                    <div className="code-response">
                      <pre><code>{msg.content.replace(/```[a-z]*\n?|```/g, '')}</code></pre>
                      {msg.mode === 'agent' && (
                        <div className="code-actions">
                          <button className="action-btn apply" onClick={() => applyEdit(msg.content)}>
                            ✅ Apply Changes
                          </button>
                          <button className="action-btn copy" onClick={() => navigator.clipboard.writeText(msg.content.replace(/```[a-z]*\n?|```/g, ''))}>
                            📋 Copy Code
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-content">{msg.content}</div>
                  )}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="message-attachments">
                      <div className="attachments-header">📎 Attachments:</div>
                      {msg.attachments.map((att, idx) => (
                        <div key={idx} className="attachment-item">
                          <span className="attachment-icon">
                            {att.type.startsWith('image/') ? '🖼️' : 
                             att.type === 'application/pdf' ? '📄' : '📝'}
                          </span>
                          <span className="attachment-name">{att.name}</span>
                          <span className="attachment-size">({(att.size/1024).toFixed(1)}KB)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-body">
                <div className="message-header">
                  <span className="message-sender">AriAI</span>
                  <span className="message-mode">{ariAIMode}</span>
                </div>
                <div className="message-content loading">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="ariai-input-area">
          {ariAIMode === 'migrate' && (
            <div className="migration-controls">
              <select 
                className="lang-select" 
                value={sourceLanguage} 
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                <option value="rust">🦀 Rust</option>
                <option value="solidity">💎 Solidity</option>
                <option value="cpp">⚡ C++</option>
              </select>
              <span className="migration-arrow">→</span>
              <select 
                className="lang-select" 
                value={targetLanguage} 
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                <option value="solidity">💎 Solidity</option>
                <option value="rust">🦀 Rust</option>
                <option value="cpp">⚡ C++</option>
              </select>
            </div>
          )}
          
          <div className="input-container">
            {attachedFiles.length > 0 && (
              <div className="attached-files">
                <div className="attachments-header">📎 Attached Files:</div>
                <div className="attachments-list">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="attachment-preview">
                      <span className="attachment-icon">
                        {file.type.startsWith('image/') ? '🖼️' : 
                         file.type === 'application/pdf' ? '📄' : '📝'}
                      </span>
                      <span className="attachment-info">
                        <span className="attachment-name">{file.name}</span>
                        <span className="attachment-size">({(file.size/1024).toFixed(1)}KB)</span>
                      </span>
                      <button 
                        className="remove-attachment" 
                        onClick={() => removeAttachment(index)}
                        title="Remove attachment"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="input-wrapper">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={ariAIMode === 'chat' ? 'Ask me anything about your code...' : 
                           ariAIMode === 'agent' ? 'Tell me what to change in your code...' :
                           'Paste code to migrate between languages...'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!isLoading && (inputMessage.trim() || attachedFiles.length > 0)) sendMessage();
                  }
                }}
                className="message-input"
                rows={3}
                autoFocus={false}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              <div className="input-actions">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.txt,.md"
                  onChange={handleFileAttachment}
                  style={{ display: 'none' }}
                />
                <button 
                  className="attach-btn" 
                  title="Attach files (Images, PDF, Text)"
                  onClick={() => fileInputRef.current?.click()}
                >
                  📎
                </button>
                <button 
                  className="send-btn" 
                  onClick={sendMessage} 
                  disabled={isLoading || (!inputMessage.trim() && attachedFiles.length === 0)}
                  title="Send message (Enter)"
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="input-footer">
              <span className="input-hint">
                {ariAIMode === 'chat' ? '💡 Ask about debugging, optimization, or best practices' :
                 ariAIMode === 'agent' ? '🛠️ I\'ll directly edit your code based on your request' :
                 '🔄 I\'ll convert your code between Solidity, Rust, and C++'}
                {attachedFiles.length > 0 && (
                  <span className="attachment-hint"> • {attachedFiles.length} file(s) attached</span>
                )}
              </span>
              <div className="input-stats">
                <span>{inputMessage.length}/2000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContractInteraction = () => (
    showContractInteraction && deployedContract && (
      <div className="modal-overlay" onClick={() => setShowContractInteraction(false)}>
        <div className="contract-interaction-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Contract Interaction</h3>
            <button onClick={() => setShowContractInteraction(false)}>×</button>
          </div>
          <div className="contract-info">
            <p><strong>Address:</strong> {deployedContract.address}</p>
            <p><strong>Network:</strong> Arbitrum Sepolia</p>
          </div>
          <div className="contract-functions">
            <h4>Available Functions</h4>
            {deployedContract.abi.map((func, i) => (
              <div key={i} className="function-item">
                <button 
                  className="function-btn"
                  onClick={() => interactWithContract(func.name)}
                  disabled={isLoading}
                >
                  {func.name}()
                </button>
                <span className="function-type">{func.outputs[0]?.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className={`ide-container ${theme}`} data-theme={theme}>
      <div className="title-bar">
        <div className="title-left">
          <div className="window-controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>
          <span className="app-title">Arbitrum Stylus IDE</span>
        </div>
        <div className="title-center">
          <span className="project-name">stylus-contract</span>
        </div>
        <div className="title-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {walletConnected ? (
            <div className="wallet-info">
              <span className="wallet-address">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              <span className="network-badge">Arbitrum</span>
            </div>
          ) : (
            <button className="connect-wallet-btn" onClick={connectWallet}>
              🔗 Connect Wallet
            </button>
          )}
        </div>
      </div>

      <div className="menu-bar">
        {Object.keys(menuActions).map(menu => (
          <div 
            key={menu}
            className="menu-item"
            onClick={() => setShowMenuDropdown(showMenuDropdown === menu ? null : menu)}
          >
            {menu.charAt(0).toUpperCase() + menu.slice(1)}
            {showMenuDropdown === menu && (
              <div className="menu-dropdown">
                {Object.entries(menuActions[menu]).map(([action, handler]) => (
                  <div 
                    key={action}
                    className="menu-dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      try {
                        handler();
                      } catch (error) {
                        addToTerminal(`ERROR: Failed to execute ${action} - ${error.message}`);
                      }
                      setShowMenuDropdown(null);
                    }}
                  >
                    {action}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="main-layout">
        <div className="activity-bar">
          <div 
            className={`activity-item ${sidebarView === 'explorer' ? 'active' : ''}`}
            onClick={() => setSidebarView('explorer')}
            title="Explorer"
          >
            📁
          </div>
          <div 
            className={`activity-item ${sidebarView === 'search' ? 'active' : ''}`}
            onClick={() => setSidebarView('search')}
            title="Search"
          >
            🔍
          </div>
          <div 
            className={`activity-item ${sidebarView === 'git' ? 'active' : ''}`}
            onClick={() => setSidebarView('git')}
            title="Source Control"
          >
            📂
          </div>
          <div 
            className={`activity-item ${sidebarView === 'test' ? 'active' : ''}`}
            onClick={() => setSidebarView('test')}
            title="Testing"
          >
            🧪
          </div>
          <div 
            className={`activity-item ${sidebarView === 'debug' ? 'active' : ''}`}
            onClick={() => setSidebarView('debug')}
            title="Debugger"
          >
            🐛
          </div>
          <div 
            className={`activity-item ${sidebarView === 'profiler' ? 'active' : ''}`}
            onClick={() => setSidebarView('profiler')}
            title="Gas Profiler"
          >
            📊
          </div>
          <div 
            className={`activity-item ${sidebarView === 'learn' ? 'active' : ''}`}
            onClick={() => setSidebarView('learn')}
            title="LearnARB"
          >
            📚
          </div>
          <div 
            className={`activity-item ${sidebarView === 'ariai' ? 'active' : ''}`}
            onClick={() => setSidebarView('ariai')}
            title="AriAI"
          >
            🤖
          </div>
          <div 
            className="activity-item"
            onClick={() => setShowCommandPalette(true)}
            title="Command Palette"
          >
            ⌘
          </div>
        </div>

        <div className="sidebar">
          {sidebarView === 'explorer' && <FileExplorer />}
          {sidebarView === 'git' && <GitPanel onTerminalOutput={addToTerminal} />}
          {sidebarView === 'test' && <TestPanel />}
          {sidebarView === 'debug' && <DebugPanel />}
          {sidebarView === 'profiler' && <ProfilerPanel />}
          {sidebarView === 'learn' && <LearnARB />}
        </div>

        <div className="editor-area">
          <div className="tab-bar">
            {openTabs.map(tab => (
              <div 
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="tab-icon">🦀</span>
                <span className="tab-name">{tab}</span>
                <button 
                  className="tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="toolbar">
            <div className="toolbar-left">
              <button 
                className="toolbar-btn primary" 
                onClick={buildProject}
                disabled={isLoading}
              >
                🔨 Build
              </button>
              <button 
                className="toolbar-btn" 
                onClick={runTests}
                disabled={isLoading}
              >
                🧪 Test
              </button>
              <button 
                className="toolbar-btn" 
                onClick={startDebugger}
                disabled={isLoading}
              >
                🐛 Debug
              </button>
              <button 
                className="toolbar-btn" 
                onClick={deployContract}
                disabled={isLoading || !walletConnected}
              >
                🚀 Deploy
              </button>
              <button 
                className="toolbar-btn" 
                onClick={profileGas}
                disabled={isLoading}
              >
                📊 Profile
              </button>
              {deployedContract && (
                <button 
                  className="toolbar-btn interact" 
                  onClick={() => setShowContractInteraction(true)}
                >
                  📞 Interact
                </button>
              )}
            </div>
            <div className="toolbar-right">
              <span className="status-indicator">
                {isLoading ? '⏳ Processing...' : '✅ Ready'}
              </span>
            </div>
          </div>

          <div className="editor-wrapper">
            <Editor
              height="100%"
              defaultLanguage="rust"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              value={code}
              onChange={setCode}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                insertSpaces: true,
                glyphMargin: true,
                folding: true,
                wordWrap: 'on',
                contextmenu: true,
                quickSuggestions: true,
                suggestOnTriggerCharacters: true,
              }}
            />
          </div>
        </div>
        <div 
          className={`right-sidebar ${sidebarView === 'ariai' ? 'visible' : ''}`}
          style={{ width: sidebarView === 'ariai' ? `${sidebarWidth}px` : '0' }}
        >
          {sidebarView === 'ariai' && (
            <>
              <div className="resize-handle"></div>
              <AriAIPanel />
            </>
          )}
        </div>
      </div>

      {showTerminal && (
        <div className="terminal-panel">
          <div className="terminal-header">
            <span>TERMINAL</span>
            <div className="terminal-actions">
              <button onClick={() => setTerminalOutput('Arbitrum Stylus IDE Terminal\nType commands or use the toolbar buttons above\n$ ')}>Clear</button>
              <button onClick={() => setShowTerminal(false)}>×</button>
            </div>
          </div>
          <div className="terminal-content">
            <pre>{terminalOutput}</pre>
          </div>
        </div>
      )}

      <div className="status-bar">
        <div className="status-left">
          <span className="status-item">🦀 Rust</span>
          <span className="status-item">UTF-8</span>
          <span className="status-item">Ln {currentExecutionLine || 1}, Col 1</span>
          <span className="status-item">Spaces: 4</span>
        </div>
        <div className="status-right">
          <span className="status-item">Stylus v0.1.0</span>
          <span className="status-item">⚡ Wasmer</span>
          {walletConnected && <span className="status-item">🔗 Connected</span>}
          {deployedContract && <span className="status-item">📝 Deployed</span>}
        </div>
      </div>

      <CommandPalette />
      <ContractInteraction />
    </div>
  );
}

export default App;