import React, { useState } from 'react';

const LearnARB = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const tutorials = [
    {
      id: 1,
      title: 'Basics of Arbitrum Stylus',
      author: 'Arbitrum Team',
      level: 'Beginner',
      chapters: 8,
      description: 'Loading, Compiling, Deploying. This beginner level tutorial introduces Arbitrum Stylus interface and concepts used in Layer 2 scaling.',
      tags: ['stylus', 'basics', 'l2'],
      duration: '45 min'
    },
    {
      id: 2,
      title: 'Stylus Smart Contract Development',
      author: 'Stylus-SDK Team',
      level: 'Intermediate',
      chapters: 12,
      description: 'Learn how to write, compile, and deploy smart contracts using Rust and the Stylus SDK. Covers advanced patterns and optimization techniques.',
      tags: ['rust', 'smart-contracts', 'sdk'],
      duration: '90 min'
    },
    {
      id: 3,
      title: 'Gas Optimization in Stylus',
      author: 'Performance Team',
      level: 'Advanced',
      chapters: 6,
      description: 'Master gas optimization techniques specific to Stylus contracts. Learn about WASM efficiency and cost-effective programming patterns.',
      tags: ['gas', 'optimization', 'performance'],
      duration: '60 min'
    },
    {
      id: 4,
      title: 'Cross-Chain Bridge Development',
      author: 'Bridge Team',
      level: 'Advanced',
      chapters: 10,
      description: 'Build secure cross-chain bridges between Arbitrum and other networks. Covers security patterns and best practices.',
      tags: ['bridge', 'cross-chain', 'security'],
      duration: '120 min'
    },
    {
      id: 5,
      title: 'DeFi Protocols on Arbitrum',
      author: 'DeFi Labs',
      level: 'Intermediate',
      chapters: 15,
      description: 'Create decentralized finance protocols leveraging Arbitrum\'s low fees and high throughput. Includes AMM, lending, and yield farming.',
      tags: ['defi', 'amm', 'lending'],
      duration: '150 min'
    },
    {
      id: 6,
      title: 'NFT Marketplace with Stylus',
      author: 'NFT Collective',
      level: 'Beginner',
      chapters: 9,
      description: 'Build a complete NFT marketplace using Stylus smart contracts. Covers minting, trading, and royalty mechanisms.',
      tags: ['nft', 'marketplace', 'erc721'],
      duration: '75 min'
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || tutorial.level.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const importTutorial = () => {
    alert('Import tutorial repository functionality would connect to GitHub API');
  };

  const startTutorial = (tutorial) => {
    alert(`Starting tutorial: ${tutorial.title}\nThis would load the tutorial content and setup the development environment.`);
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner': return '#4caf50';
      case 'intermediate': return '#ff9800';
      case 'advanced': return '#f44336';
      default: return '#2196f3';
    }
  };

  return (
    <div className="learn-arb-panel">
      <div className="panel-header">
        <span>LEARNARB</span>
        <div className="panel-actions">
          <button className="panel-btn" title="Refresh">🔄</button>
          <button className="panel-btn" title="Settings">⚙️</button>
        </div>
      </div>
      
      <div className="panel-content">
        <div className="import-section">
          <button className="import-btn" onClick={importTutorial}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8.5 1.5V7h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L12.293 8H8.5v5.5a.5.5 0 0 1-1 0V8H3.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L3.707 7H7.5V1.5a.5.5 0 0 1 1 0z"/>
            </svg>
            Import another tutorial repo
          </button>
        </div>
        
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        
        <div className="tutorials-list">
          {filteredTutorials.map(tutorial => (
            <div key={tutorial.id} className="tutorial-card">
              <div className="tutorial-header">
                <div className="tutorial-level" style={{ backgroundColor: getLevelColor(tutorial.level) }}>
                  {tutorial.level}
                </div>
                <div className="tutorial-chapters">
                  {tutorial.chapters} chapters
                </div>
              </div>
              
              <div className="tutorial-content">
                <h3 className="tutorial-title">{tutorial.title}</h3>
                <p className="tutorial-author">{tutorial.author}</p>
                <p className="tutorial-description">{tutorial.description}</p>
                
                <div className="tutorial-tags">
                  {tutorial.tags.map(tag => (
                    <span key={tag} className="tutorial-tag">#{tag}</span>
                  ))}
                </div>
                
                <div className="tutorial-footer">
                  <span className="tutorial-duration">⏱️ {tutorial.duration}</span>
                  <button 
                    className="start-tutorial-btn"
                    onClick={() => startTutorial(tutorial)}
                  >
                    Start Tutorial
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTutorials.length === 0 && (
          <div className="no-results">
            <p>No tutorials found matching your search criteria.</p>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
        
        <div className="learn-arb-footer">
          <div className="footer-section">
            <h4>📚 Learning Resources</h4>
            <ul>
              <li><a href="#" target="_blank">Arbitrum Documentation</a></li>
              <li><a href="#" target="_blank">Stylus SDK Reference</a></li>
              <li><a href="#" target="_blank">Rust Programming Guide</a></li>
              <li><a href="#" target="_blank">WASM Optimization Tips</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>🛠️ Development Tools</h4>
            <ul>
              <li><a href="#" target="_blank">Stylus CLI</a></li>
              <li><a href="#" target="_blank">Arbitrum Bridge</a></li>
              <li><a href="#" target="_blank">Testnet Faucet</a></li>
              <li><a href="#" target="_blank">Block Explorer</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>🌐 Community</h4>
            <ul>
              <li><a href="#" target="_blank">Discord Server</a></li>
              <li><a href="#" target="_blank">GitHub Repository</a></li>
              <li><a href="#" target="_blank">Developer Forum</a></li>
              <li><a href="#" target="_blank">Twitter Updates</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnARB;