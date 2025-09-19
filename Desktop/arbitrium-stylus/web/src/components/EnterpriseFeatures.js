import React, { useState } from 'react';

const EnterpriseFeatures = ({ currentTier, onUpgrade }) => {
  const [activeDemo, setActiveDemo] = useState('ci-cd');

  const enterpriseFeatures = {
    'ci-cd': {
      title: '🔄 Enterprise CI/CD',
      description: 'Advanced continuous integration with custom pipelines',
      demo: (
        <div className="ci-cd-demo">
          <div className="pipeline-stage completed">
            <span className="stage-icon">✅</span>
            <span className="stage-name">Build</span>
            <span className="stage-time">2m 34s</span>
          </div>
          <div className="pipeline-stage completed">
            <span className="stage-icon">✅</span>
            <span className="stage-name">Test</span>
            <span className="stage-time">1m 12s</span>
          </div>
          <div className="pipeline-stage running">
            <span className="stage-icon">🔄</span>
            <span className="stage-name">Security Scan</span>
            <span className="stage-time">Running...</span>
          </div>
          <div className="pipeline-stage pending">
            <span className="stage-icon">⏳</span>
            <span className="stage-name">Deploy</span>
            <span className="stage-time">Pending</span>
          </div>
        </div>
      )
    },
    'team': {
      title: '👥 Team Collaboration',
      description: 'Multi-user workspaces with role-based access',
      demo: (
        <div className="team-demo">
          <div className="team-member">
            <div className="member-avatar">👨‍💻</div>
            <div className="member-info">
              <div className="member-name">Alice (Lead Dev)</div>
              <div className="member-status online">🟢 Online - Debugging contract</div>
            </div>
          </div>
          <div className="team-member">
            <div className="member-avatar">👩‍💻</div>
            <div className="member-info">
              <div className="member-name">Bob (DevOps)</div>
              <div className="member-status online">🟢 Online - Running tests</div>
            </div>
          </div>
          <div className="team-member">
            <div className="member-avatar">👨‍🔬</div>
            <div className="member-info">
              <div className="member-name">Charlie (Auditor)</div>
              <div className="member-status away">🟡 Away - Code review</div>
            </div>
          </div>
        </div>
      )
    },
    'security': {
      title: '🔒 Advanced Security',
      description: 'Enterprise-grade security scanning and compliance',
      demo: (
        <div className="security-demo">
          <div className="security-scan">
            <div className="scan-result passed">
              <span className="scan-icon">✅</span>
              <span className="scan-name">Vulnerability Scan</span>
              <span className="scan-status">0 issues found</span>
            </div>
            <div className="scan-result warning">
              <span className="scan-icon">⚠️</span>
              <span className="scan-name">Code Quality</span>
              <span className="scan-status">2 warnings</span>
            </div>
            <div className="scan-result passed">
              <span className="scan-icon">✅</span>
              <span className="scan-name">Compliance Check</span>
              <span className="scan-status">SOC2 compliant</span>
            </div>
          </div>
        </div>
      )
    },
    'analytics': {
      title: '📈 Advanced Analytics',
      description: 'Deep insights and custom dashboards',
      demo: (
        <div className="analytics-demo">
          <div className="analytics-metric">
            <div className="metric-title">Deploy Success Rate</div>
            <div className="metric-value">98.7%</div>
            <div className="metric-trend positive">↗️ +2.3%</div>
          </div>
          <div className="analytics-metric">
            <div className="metric-title">Avg Gas Optimization</div>
            <div className="metric-value">23%</div>
            <div className="metric-trend positive">↗️ +5.1%</div>
          </div>
          <div className="analytics-metric">
            <div className="metric-title">Test Coverage</div>
            <div className="metric-value">94.2%</div>
            <div className="metric-trend neutral">→ 0%</div>
          </div>
        </div>
      )
    }
  };

  const consultingServices = [
    {
      title: '🏗️ Architecture Review',
      description: 'Expert review of your Stylus contract architecture',
      price: '$5,000',
      duration: '2-3 weeks'
    },
    {
      title: '⚡ Performance Optimization',
      description: 'Gas optimization and performance tuning',
      price: '$3,000',
      duration: '1-2 weeks'
    },
    {
      title: '🔒 Security Audit',
      description: 'Comprehensive security audit and recommendations',
      price: '$8,000',
      duration: '3-4 weeks'
    },
    {
      title: '📚 Team Training',
      description: 'Stylus development training for your team',
      price: '$2,000',
      duration: '1 week'
    }
  ];

  const grantOpportunities = [
    {
      title: 'Arbitrum DAO Grant',
      amount: '$50,000 - $500,000',
      description: 'Building public goods for the Arbitrum ecosystem',
      status: 'Open',
      deadline: 'Rolling basis'
    },
    {
      title: 'Retroactive Public Goods Funding',
      amount: '$10,000 - $100,000',
      description: 'Retroactive funding for impactful open source work',
      status: 'Quarterly',
      deadline: 'Next: Q2 2024'
    },
    {
      title: 'Ecosystem Development Fund',
      amount: '$25,000 - $250,000',
      description: 'Supporting innovative Stylus tooling and infrastructure',
      status: 'Open',
      deadline: 'Monthly reviews'
    }
  ];

  if (currentTier !== 'enterprise') {
    return (
      <div className="enterprise-preview">
        <div className="enterprise-header">
          <h2>🏢 Enterprise Features</h2>
          <p>Advanced capabilities for teams and organizations</p>
        </div>

        <div className="feature-demos">
          <div className="demo-selector">
            {Object.entries(enterpriseFeatures).map(([key, feature]) => (
              <button
                key={key}
                className={`demo-tab ${activeDemo === key ? 'active' : ''}`}
                onClick={() => setActiveDemo(key)}
              >
                {feature.title}
              </button>
            ))}
          </div>

          <div className="demo-content">
            <div className="demo-header">
              <h3>{enterpriseFeatures[activeDemo].title}</h3>
              <p>{enterpriseFeatures[activeDemo].description}</p>
            </div>
            <div className="demo-preview">
              {enterpriseFeatures[activeDemo].demo}
            </div>
          </div>
        </div>

        <div className="enterprise-benefits">
          <h3>🚀 Enterprise Benefits</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🏢</div>
              <div className="benefit-title">On-Premise Deployment</div>
              <div className="benefit-desc">Deploy on your own infrastructure</div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔧</div>
              <div className="benefit-title">Custom Integrations</div>
              <div className="benefit-desc">Integrate with your existing tools</div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📞</div>
              <div className="benefit-title">Dedicated Support</div>
              <div className="benefit-desc">24/7 support with SLA guarantees</div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎓</div>
              <div className="benefit-title">Training & Consulting</div>
              <div className="benefit-desc">Expert guidance and team training</div>
            </div>
          </div>
        </div>

        <div className="consulting-section">
          <h3>💼 Consulting Services</h3>
          <div className="consulting-grid">
            {consultingServices.map((service, index) => (
              <div key={index} className="consulting-card">
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <div className="consulting-details">
                  <span className="consulting-price">{service.price}</span>
                  <span className="consulting-duration">{service.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grants-section">
          <h3>💰 Funding Opportunities</h3>
          <div className="grants-list">
            {grantOpportunities.map((grant, index) => (
              <div key={index} className="grant-item">
                <div className="grant-header">
                  <h4>{grant.title}</h4>
                  <span className={`grant-status ${grant.status.toLowerCase()}`}>
                    {grant.status}
                  </span>
                </div>
                <p>{grant.description}</p>
                <div className="grant-details">
                  <span className="grant-amount">{grant.amount}</span>
                  <span className="grant-deadline">{grant.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="enterprise-cta">
          <h3>Ready to Scale?</h3>
          <p>Contact us for custom enterprise solutions and pricing</p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => onUpgrade('enterprise')}>
              Contact Sales
            </button>
            <button className="cta-btn secondary">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="enterprise-dashboard">
      <div className="dashboard-header">
        <h2>🏢 Enterprise Dashboard</h2>
        <div className="enterprise-status">
          <span className="status-badge active">Enterprise Active</span>
        </div>
      </div>

      <div className="enterprise-metrics">
        <div className="metric-card">
          <div className="metric-title">Team Members</div>
          <div className="metric-value">12</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Projects</div>
          <div className="metric-value">8</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Deployments</div>
          <div className="metric-value">156</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Uptime</div>
          <div className="metric-value">99.9%</div>
        </div>
      </div>

      <div className="enterprise-features-active">
        {Object.entries(enterpriseFeatures).map(([key, feature]) => (
          <div key={key} className="feature-panel">
            <h3>{feature.title}</h3>
            <div className="feature-content">
              {feature.demo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnterpriseFeatures;