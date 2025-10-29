import { OverviewPage } from './insights/OverviewPage';

export function InsightsContent({ selectedPage }: { selectedPage: string }) {
  // If Overview page, render the new design
  if (selectedPage === 'overview') {
    return <OverviewPage />;
  }

  // For other pages, keep the placeholder implementation
  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'overview': 'Overview',
      'analytics': 'Analytics',
      'performance': 'Performance',
      'trends': 'Trends',
      'reports': 'Reports',
      'activity': 'Activity Log',
    };
    return titles[selectedPage] || 'Overview';
  };

  return (
    <div className="flex-1 h-full overflow-auto">
      <div className="p-[24px]">
        <div className="flex flex-col gap-[24px]">
          {/* Header */}
          <div className="flex flex-col gap-[8px]">
            <h2 style={{ fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
              {getPageTitle()}
            </h2>
            <p style={{ fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-regular)', color: 'var(--muted-foreground)' }}>
              Track and analyze your document activity
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
            {[
              { label: 'Total Documents', value: '1,234', change: '+12%' },
              { label: 'Completed', value: '856', change: '+8%' },
              { label: 'Pending', value: '234', change: '-3%' },
              { label: 'Expired', value: '144', change: '+2%' },
            ].map((stat, index) => (
              <div
                key={index}
                className="border rounded-[var(--radius-card)] p-[20px]"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--card)'
                }}
              >
                <div className="flex flex-col gap-[8px]">
                  <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-[8px]">
                    <h3 style={{ fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                      {stat.value}
                    </h3>
                    <span
                      className="caption"
                      style={{
                        color: stat.change.startsWith('+') ? 'var(--chart-2)' : 'var(--destructive)',
                        fontWeight: 'var(--font-weight-semibold)'
                      }}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <div
            className="border rounded-[var(--radius-card)] p-[24px]"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--card)'
            }}
          >
            <div className="flex flex-col gap-[16px]">
              <h4 style={{ fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                Document Activity
              </h4>
              <div
                className="w-full h-[300px] rounded-[var(--radius)] flex items-center justify-center"
                style={{ backgroundColor: 'var(--muted)' }}
              >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20V10" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 20V4" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20v-4" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Recent Activity List */}
          <div
            className="border rounded-[var(--radius-card)] overflow-hidden"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--card)'
            }}
          >
            <div className="p-[20px] border-b" style={{ borderColor: 'var(--border)' }}>
              <h4 style={{ fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                Recent Activity
              </h4>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="p-[20px] hover:bg-[var(--muted)] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-[16px]">
                    <div className="flex-1">
                      <p style={{ fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                        Document {item} was signed
                      </p>
                      <p className="caption mt-[4px]" style={{ color: 'var(--muted-foreground)' }}>
                        2 hours ago
                      </p>
                    </div>
                    <div
                      className="px-[12px] py-[4px] rounded-[var(--radius-button)]"
                      style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
                    >
                      <span className="caption">Completed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
