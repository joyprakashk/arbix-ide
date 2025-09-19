import React, { useState, useEffect } from 'react';

const GitPanel = ({ onTerminalOutput }) => {
  const [gitStatus, setGitStatus] = useState('not-initialized');
  const [branches, setBranches] = useState(['main']);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [changes, setChanges] = useState([]);
  const [commitMessage, setCommitMessage] = useState('');
  const [remoteUrl, setRemoteUrl] = useState('');
  const [cloneBranch, setCloneBranch] = useState('main');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkGitStatus();
  }, []);

  const checkGitStatus = () => {
    const mockChanges = [
      { file: 'src/lib.rs', status: 'modified', type: 'M' },
      { file: 'tests/integration.rs', status: 'added', type: 'A' },
      { file: 'Cargo.toml', status: 'modified', type: 'M' }
    ];
    setChanges(mockChanges);
    setGitStatus('initialized');
  };

  const initializeRepo = async () => {
    setIsLoading(true);
    onTerminalOutput('🔧 Initializing Git repository...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setGitStatus('initialized');
    onTerminalOutput('✅ Git repository initialized');
    onTerminalOutput('📝 Created .git directory');
    onTerminalOutput('🌿 Created main branch');
    
    setIsLoading(false);
  };

  const cloneRepository = async () => {
    if (!remoteUrl) {
      onTerminalOutput('❌ Please enter a repository URL');
      return;
    }
    
    setIsLoading(true);
    onTerminalOutput(`🔄 Cloning repository from ${remoteUrl}...`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGitStatus('initialized');
    onTerminalOutput('✅ Repository cloned successfully');
    onTerminalOutput(`🌿 Switched to branch: ${cloneBranch}`);
    setCurrentBranch(cloneBranch);
    
    setIsLoading(false);
  };

  const stageFile = (file) => {
    setChanges(prev => prev.map(change => 
      change.file === file 
        ? { ...change, staged: !change.staged }
        : change
    ));
    onTerminalOutput(`📋 ${changes.find(c => c.file === file)?.staged ? 'Unstaged' : 'Staged'}: ${file}`);
  };

  const commitChanges = async () => {
    if (!commitMessage.trim()) {
      onTerminalOutput('❌ Please enter a commit message');
      return;
    }
    
    const stagedFiles = changes.filter(c => c.staged);
    if (stagedFiles.length === 0) {
      onTerminalOutput('❌ No files staged for commit');
      return;
    }
    
    setIsLoading(true);
    onTerminalOutput(`📝 Committing ${stagedFiles.length} files...`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onTerminalOutput(`✅ Committed: "${commitMessage}"`);
    onTerminalOutput(`📊 ${stagedFiles.length} files changed`);
    
    setChanges(prev => prev.filter(c => !c.staged));
    setCommitMessage('');
    setIsLoading(false);
  };

  const pushChanges = async () => {
    setIsLoading(true);
    onTerminalOutput(`🚀 Pushing to origin/${currentBranch}...`);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onTerminalOutput('✅ Push completed successfully');
    onTerminalOutput('📡 Remote repository updated');
    
    setIsLoading(false);
  };

  const pullChanges = async () => {
    setIsLoading(true);
    onTerminalOutput(`⬇️ Pulling from origin/${currentBranch}...`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onTerminalOutput('✅ Pull completed successfully');
    onTerminalOutput('🔄 Local repository updated');
    
    setIsLoading(false);
  };

  const createBranch = () => {
    const branchName = prompt('Enter branch name:');
    if (branchName && !branches.includes(branchName)) {
      setBranches(prev => [...prev, branchName]);
      setCurrentBranch(branchName);
      onTerminalOutput(`🌿 Created and switched to branch: ${branchName}`);
    }
  };

  const switchBranch = (branch) => {
    setCurrentBranch(branch);
    onTerminalOutput(`🌿 Switched to branch: ${branch}`);
  };

  if (gitStatus === 'not-initialized') {
    return (
      <div className="git-panel">
        <div className="panel-header">
          <span>GIT</span>
          <span className="git-usage">0 MB used (0%)</span>
        </div>
        
        <div className="panel-content">
          <div className="git-setup">
            <h3>SETUP REQUIRED</h3>
            <p>To ensure that your commits are properly attributed in Git, you need to configure a username and email OR connect to GitHub.</p>
            
            <div className="git-section">
              <h4>INITIALIZE</h4>
              <button 
                className="git-btn primary"
                onClick={initializeRepo}
                disabled={isLoading}
              >
                Initialize repository
              </button>
            </div>
            
            <div className="git-section">
              <h4>CLONE</h4>
              <div className="clone-section">
                <h5>CLONE FROM GITHUB</h5>
                <button className="git-btn secondary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  Load from GitHub
                </button>
                <p className="git-note">Generate and add a Git token or login with GitHub. Tokens are added in settings.</p>
              </div>
              
              <div className="clone-section">
                <h5>CLONE FROM URL</h5>
                <input
                  type="text"
                  placeholder="url"
                  value={remoteUrl}
                  onChange={(e) => setRemoteUrl(e.target.value)}
                  className="git-input"
                />
                <input
                  type="text"
                  placeholder="branch"
                  value={cloneBranch}
                  onChange={(e) => setCloneBranch(e.target.value)}
                  className="git-input"
                />
                <button 
                  className="git-btn primary"
                  onClick={cloneRepository}
                  disabled={isLoading}
                >
                  clone
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="git-panel">
      <div className="panel-header">
        <span>GIT</span>
        <div className="git-actions">
          <button onClick={pullChanges} disabled={isLoading} title="Pull">⬇️</button>
          <button onClick={pushChanges} disabled={isLoading} title="Push">⬆️</button>
          <button onClick={createBranch} title="New Branch">🌿</button>
        </div>
      </div>
      
      <div className="panel-content">
        <div className="branch-selector">
          <select 
            value={currentBranch} 
            onChange={(e) => switchBranch(e.target.value)}
            className="branch-select"
          >
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
        
        <div className="git-changes">
          <h4>CHANGES ({changes.length})</h4>
          {changes.map((change, index) => (
            <div key={index} className={`change-item ${change.staged ? 'staged' : ''}`}>
              <span className={`change-type ${change.type}`}>{change.type}</span>
              <span className="change-file">{change.file}</span>
              <button 
                className="stage-btn"
                onClick={() => stageFile(change.file)}
              >
                {change.staged ? '−' : '+'}
              </button>
            </div>
          ))}
        </div>
        
        <div className="commit-section">
          <textarea
            placeholder="Commit message"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            className="commit-input"
            rows="3"
          />
          <button 
            className="git-btn primary"
            onClick={commitChanges}
            disabled={isLoading || !commitMessage.trim()}
          >
            Commit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitPanel;