import React, { useState, useEffect } from 'react';

const GasAnalytics = ({ isProTier, gasData, onUpgrade }) => {
  const [timeRange, setTimeRange] = useState('1h');
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    if (isProTier && gasData) {
      generateAdvancedAnalytics();
    }
  }, [isProTier, gasData, timeRange]);

  const generateAdvancedAnalytics = () => {
    const mockData = {
      trends: [
        { time: '10:00', gas: 120, optimized: 95 },
        { time: '10:15', gas: 135, optimized: 108 },
        { time: '10:30', gas: 118, optimized: 92 },
        { time: '10:45', gas: 142, optimized: 115 }
      ],
      hotspots: [
        { function: 'increment', gas: 85, percentage: 70.8, optimization: 'High' },
        { function: 'get', gas: 25, percentage: 20.8, optimization: 'Medium' },
        { function: 'reset', gas: 10, percentage: 8.4, optimization: 'Low' }
      ],
      recommendations: [
        { type: 'critical', message: 'Consider using packed structs to reduce memory access costs' },
        { type: 'warning', message: 'Loop in increment() could be optimized with batch operations' },
        { type: 'info', message: 'Gas usage is within acceptable limits for this contract size' }
      ],
      comparison: {
        current: 120,
        average: 108,
        best: 92,
        worst: 142
      }
    };
    setAnalyticsData(mockData);
  };

  if (!isProTier) {
    return (
      <div className="pro-feature-analytics">
        <div className="analytics-preview">
          <h3>🚀 Advanced Gas Analytics</h3>
          <div className="preview-charts">
            <div className="chart-placeholder">
              <div className="chart-title">Gas Trends Over Time</div>
              <div className="mock-chart">📈</div>
            </div>
            <div className="chart-placeholder">
              <div className="chart-title">Function Hotspots</div>
              <div className="mock-chart">🔥</div>
            </div>
            <div className="chart-placeholder">
              <div className="chart-title">Optimization Recommendations</div>
              <div className="mock-chart">💡</div>
            </div>
          </div>
          <div className="pro-features-list">
            <div className="feature-item">📊 Real-time gas trend analysis</div>
            <div className="feature-item">🎯 Function-level hotspot detection</div>
            <div className="feature-item">💡 AI-powered optimization suggestions</div>
            <div className="feature-item">📈 Performance benchmarking</div>
            <div className="feature-item">🔄 Historical comparison</div>
            <div className="feature-item">📋 Detailed reports export</div>
          </div>
          <button className="upgrade-btn-analytics" onClick={onUpgrade}>
            Unlock Advanced Analytics - Pro $29/month
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gas-analytics-dashboard">
      <div className="analytics-header">
        <h3>📊 Gas Analytics Dashboard</h3>
        <div className="time-selector">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {analyticsData && (
        <div className="analytics-content">
          <div className="metrics-overview">
            <div className="metric-card current">
              <div className="metric-label">Current Gas</div>
              <div className="metric-value">{analyticsData.comparison.current}</div>
              <div className="metric-change positive">↗️ +12%</div>
            </div>
            <div className="metric-card average">
              <div className="metric-label">Average</div>
              <div className="metric-value">{analyticsData.comparison.average}</div>
              <div className="metric-change neutral">→ 0%</div>
            </div>
            <div className="metric-card best">
              <div className="metric-label">Best</div>
              <div className="metric-value">{analyticsData.comparison.best}</div>
              <div className="metric-change positive">↗️ Best</div>
            </div>
            <div className="metric-card worst">
              <div className="metric-label">Worst</div>
              <div className="metric-value">{analyticsData.comparison.worst}</div>
              <div className="metric-change negative">↘️ Worst</div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-container">
              <h4>Gas Trends</h4>
              <div className="trend-chart">
                {analyticsData.trends.map((point, index) => (
                  <div key={index} className="trend-point">
                    <div className="trend-bar">
                      <div 
                        className="trend-fill current"
                        style={{ height: `${(point.gas / 150) * 100}%` }}
                      ></div>
                      <div 
                        className="trend-fill optimized"
                        style={{ height: `${(point.optimized / 150) * 100}%` }}
                      ></div>
                    </div>
                    <div className="trend-label">{point.time}</div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <span className="legend-item current">Current</span>
                <span className="legend-item optimized">Optimized</span>
              </div>
            </div>

            <div className="chart-container">
              <h4>Function Hotspots</h4>
              <div className="hotspots-chart">
                {analyticsData.hotspots.map((hotspot, index) => (
                  <div key={index} className="hotspot-item">
                    <div className="hotspot-info">
                      <span className="hotspot-name">{hotspot.function}</span>
                      <span className="hotspot-optimization">{hotspot.optimization}</span>
                    </div>
                    <div className="hotspot-bar">
                      <div 
                        className="hotspot-fill"
                        style={{ width: `${hotspot.percentage}%` }}
                      ></div>
                    </div>
                    <span className="hotspot-gas">{hotspot.gas}g</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recommendations-panel">
            <h4>💡 Optimization Recommendations</h4>
            <div className="recommendations-list">
              {analyticsData.recommendations.map((rec, index) => (
                <div key={index} className={`recommendation ${rec.type}`}>
                  <div className="rec-icon">
                    {rec.type === 'critical' ? '🚨' : rec.type === 'warning' ? '⚠️' : 'ℹ️'}
                  </div>
                  <div className="rec-message">{rec.message}</div>
                  <button className="rec-action">Apply</button>
                </div>
              ))}
            </div>
          </div>

          <div className="export-panel">
            <h4>📋 Export & Reports</h4>
            <div className="export-options">
              <button className="export-btn">📊 Export CSV</button>
              <button className="export-btn">📄 Generate PDF Report</button>
              <button className="export-btn">📈 Share Dashboard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GasAnalytics;