/**
 * Simple demo component to showcase the Icon system
 * This can be used in your app to preview all icons
 */

import { Icon, IconName } from './Icon';
import { iconPaths } from './iconPaths';

export function IconDemo() {
  const allIconNames = Object.keys(iconPaths) as IconName[];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '32px' }}>Ink Design System - Icon Library</h1>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '16px' }}>Size Examples</h2>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Icon name="home" size="small" />
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Small (16px)</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon name="home" size="medium" />
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Medium (20px)</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon name="home" size="large" />
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Large (24px)</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '16px' }}>All Icons ({allIconNames.length} total)</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '16px'
        }}>
          {allIconNames.map((name) => (
            <div
              key={name}
              style={{
                textAlign: 'center',
                padding: '16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0066FF';
                e.currentTarget.style.backgroundColor = '#f5f9ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title={name}
            >
              <Icon name={name} size="large" />
              <p style={{
                fontSize: '10px',
                marginTop: '8px',
                color: '#666',
                wordBreak: 'break-word'
              }}>
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
