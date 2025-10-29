import { useState } from 'react';
import { DashboardListItem } from './DashboardListItem';
import { ExploreCard } from './ExploreCard';
import { SectionHeader } from './SectionHeader';

export interface DashboardItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export interface ExploreItem {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  icon: React.ReactNode;
  backgroundColor?: string;
}

export interface OverviewPageProps {
  recents?: DashboardItem[];
  favorites?: DashboardItem[];
  exploreItems?: ExploreItem[];
}

// Dashboard icon component - using exact Figma asset from Your Favorites design
const DashboardIcon = () => (
  <div className="relative shrink-0 size-[24px]">
    <div className="absolute left-1/2 size-[18px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/1624cb47-150b-402f-acd0-542f9a003cc0" />
    </div>
  </div>
);

// Chart icon component - using exact Figma asset from Your Favorites design
const ChartIcon = () => (
  <div className="overflow-clip relative shrink-0 size-[24px]">
    <div className="absolute left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/5479cfb6-7823-4dd1-92e6-7b601bda2578" />
    </div>
  </div>
);

export function OverviewPage({ recents, favorites, exploreItems }: OverviewPageProps) {
  const [showBanner, setShowBanner] = useState(true);

  // Default data
  const defaultRecents: DashboardItem[] = recents || [
    { id: '1', title: 'Agreements dashboard', icon: <DashboardIcon /> },
    { id: '2', title: 'Upcoming renewals', icon: <ChartIcon /> },
    { id: '3', title: 'Obligations dashboard', icon: <DashboardIcon /> },
    { id: '4', title: 'Envelope sent report', icon: <ChartIcon /> },
    { id: '5', title: 'Envelope status report', icon: <ChartIcon /> },
  ];

  const defaultFavorites: DashboardItem[] = favorites || [
    { id: '1', title: 'Agreements dashboard', icon: <DashboardIcon /> },
    { id: '2', title: 'Upcoming renewals', icon: <ChartIcon /> },
    { id: '3', title: 'Obligations dashboard', icon: <DashboardIcon /> },
    { id: '4', title: 'Envelope sent report', icon: <ChartIcon /> },
    { id: '5', title: 'Envelope status report', icon: <ChartIcon /> },
  ];

  const defaultExploreItems: ExploreItem[] = exploreItems || [
    {
      id: '1',
      title: 'Review upcoming renewal',
      description: 'Discover key metrics on your upcoming renewals',
      buttonLabel: 'Review',
      icon: (
        <div className="flex items-center justify-center w-full h-full">
          <img alt="" className="block" src="https://www.figma.com/api/mcp/asset/a54c9d92-37be-447f-9369-36f61129cbf0" style={{ width: '102px', height: '102px' }} />
        </div>
      ),
    },
    {
      id: '2',
      title: 'Review envelope dashboard',
      description: 'Discover key metrics on your envelopes',
      buttonLabel: 'Review',
      icon: (
        <div className="flex items-center justify-center w-full h-full">
          <img alt="" className="block" src="https://www.figma.com/api/mcp/asset/fb1603be-c1fb-44d9-9495-fb5af97fea4d" style={{ width: '140px', height: '84px' }} />
        </div>
      ),
    },
    {
      id: '3',
      title: 'Create a custom dashboard',
      description: 'Subtitle',
      buttonLabel: 'Try',
      icon: (
        <div className="flex items-center justify-center w-full h-full">
          <img alt="" className="block" src="https://www.figma.com/api/mcp/asset/fb560d9b-7338-46cb-82b5-a6896f87cfa3" style={{ width: '184px', height: '132px' }} />
        </div>
      ),
    },
    {
      id: '4',
      title: 'Create a custom report',
      description: 'Subtitle',
      buttonLabel: 'Create',
      icon: (
        <div className="flex items-center justify-center w-full h-full">
          <img alt="" className="block" src="https://www.figma.com/api/mcp/asset/e30f2905-8f9b-48e8-9751-91035d4c839c" style={{ width: '190px', height: '135px' }} />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white relative size-full" data-name="Overview Content">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pb-0 pl-[32px] pr-[48px] pt-[32px] relative size-full">
          {/* Page Header */}
          <div className="content-stretch flex gap-[24px] items-center justify-between relative shrink-0 w-full" data-name="Page Title+Actions">
            <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
              <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[rgba(25,24,35,0.9)] text-nowrap">
                <p className="leading-[1.25] whitespace-pre" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '32px', fontWeight: 400 }}>Overview</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
              <button
                onClick={() => console.log('Menu clicked')}
                className="bg-transparent content-stretch flex flex-col items-center justify-center relative rounded-[var(--radius-button)] shrink-0 size-[40px] cursor-pointer transition-all duration-200 hover:bg-[var(--muted)]"
              >
                <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative shrink-0">
                  <div className="absolute h-[4px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[16px]">
                    <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/bb33e417-4738-4960-8fa2-446912efd62e" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Spacing */}
          <div className="h-[24px] relative shrink-0 w-full" />

          <div className="flex flex-col gap-[24px] relative shrink-0 w-full">

          {/* Search Bar */}
          <div className="relative w-full">
            <div className="bg-white border border-[rgba(30,24,30,0.7)] border-solid box-border content-stretch flex items-center h-[40px] px-[16px] py-[8px] relative rounded-[2px] w-full cursor-text hover:border-[rgba(30,24,30,0.9)] transition-all">
              <div className="flex items-center gap-[8px] flex-1">
                <div className="relative shrink-0 size-[20px]">
                  <img alt="" className="block size-full object-contain" src="https://www.figma.com/api/mcp/asset/c8c0d1d5-f7d2-4619-a395-8f6c8c5f7ab5" />
                </div>
                <p className="font-['DS_Indigo:Regular',_sans-serif] text-[16px] text-[rgba(25,24,35,0.65)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '16px', fontWeight: 400, lineHeight: '24px' }}>
                  Find reports, dashboards or ask a question
                </p>
              </div>
            </div>
          </div>

          {/* Banner */}
          {showBanner && (
            <div className="box-border content-stretch flex gap-[8px] items-center justify-center pl-[48px] pr-[8px] py-[8px] relative w-full" style={{ backgroundColor: '#f3f2fe' }}>
              <div className="box-border content-stretch flex flex-[1_0_0] gap-[16px] items-center justify-center min-h-px min-w-px pl-0 pr-[8px] py-0 relative shrink-0">
                <div className="box-border content-stretch flex gap-[8px] items-start px-0 py-[8px] relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[20px]">
                    <div className="absolute left-1/2 size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                      <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/defdfedb-f9a3-46bb-8458-f0378e51e0d4" />
                    </div>
                  </div>
                  <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] relative shrink-0 text-[14px] text-[#4200ca]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>
                    We just launched a new way to analyze your agreements, you can now bulid custom dashboards
                  </p>
                </div>
                <div className="bg-[rgba(19,0,50,0.05)] box-border content-stretch flex gap-[4px] h-[32px] items-center justify-center min-w-[80px] px-[8px] py-[6px] relative rounded-[4px] shrink-0">
                  <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.4] relative shrink-0 text-[14px] text-[rgba(19,0,50,0.9)] text-center" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>
                    Try now
                  </p>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-end relative shrink-0">
                <div className="content-stretch flex items-start relative rounded-[4px] shrink-0">
                  <button
                    onClick={() => setShowBanner(false)}
                    className="bg-transparent box-border content-stretch flex items-center justify-center px-0 py-[8px] relative rounded-[4px] shrink-0 size-[32px] cursor-pointer hover:bg-[rgba(19,0,50,0.05)] transition-colors"
                  >
                    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative shrink-0">
                      <div className="absolute left-1/2 size-[12px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/9d81757d-f1d8-4716-9651-a8b5324bc4d9" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Your Recents & Your Favorites */}
          <div className="flex gap-[16px] w-full">
            {/* Your Recents */}
            <div className="flex-1 flex flex-col gap-[16px]">
              <h3 className="font-['DS_Indigo:SemiBold',_sans-serif] leading-[1.25] text-[20px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: 1.25 }}>
                Your Recents
              </h3>
              <div className="border border-[rgba(19,0,50,0.1)] rounded-[8px] p-[16px] flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  {defaultRecents.map((item) => (
                    <DashboardListItem key={item.id} icon={item.icon} title={item.title} />
                  ))}
                </div>
                <button className="bg-[rgba(30,24,30,0.05)] h-[32px] px-[8px] py-[6px] rounded-[4px] cursor-pointer hover:bg-[rgba(30,24,30,0.1)] transition-all w-full">
                  <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.4] text-[14px] text-[rgba(30,24,30,0.9)] text-center" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>
                    View all
                  </p>
                </button>
              </div>
            </div>

            {/* Your Favorites */}
            <div className="flex-1 flex flex-col gap-[16px]">
              <h3 className="font-['DS_Indigo:SemiBold',_sans-serif] leading-[1.25] text-[20px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: 1.25 }}>
                Your Favorites
              </h3>
              <div className="border border-[rgba(19,0,50,0.1)] rounded-[8px] p-[16px] flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  {defaultFavorites.map((item) => (
                    <DashboardListItem key={item.id} icon={item.icon} title={item.title} />
                  ))}
                </div>
                <button className="bg-[rgba(30,24,30,0.05)] h-[32px] px-[8px] py-[6px] rounded-[4px] cursor-pointer hover:bg-[rgba(30,24,30,0.1)] transition-all w-full">
                  <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.4] text-[14px] text-[rgba(30,24,30,0.9)] text-center" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>
                    View all
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Agreement Summary */}
          <div className="flex flex-col gap-[12px]">
            <SectionHeader title="Agreement Summary" showMenuButton onMenuClick={() => console.log('Menu clicked')} />
            <div className="flex gap-[16px]">
              {/* Active agreements */}
              <div className="flex-1 border border-[rgba(30,24,30,0.1)] rounded-[4px] pl-[4px] pr-[12px] py-[12px] flex flex-col gap-[10px]">
                <div className="flex gap-[4px] items-start w-full">
                  <div className="opacity-0 relative shrink-0 size-[20px]" />
                  <div className="flex flex-1 gap-[16px] items-center">
                    <p className="font-['DS_Indigo:Bold',_sans-serif] leading-[1.25] text-[40px] text-black" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '40px', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.32px' }}>
                      25
                    </p>
                    <div className="flex flex-col gap-[4px]">
                      <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.25] text-[16px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
                        Active agreements
                      </p>
                      <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] text-[14px] text-[rgba(30,24,30,0.7)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>
                        This month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Expiring agreements */}
              <div className="flex-1 border border-[rgba(30,24,30,0.1)] rounded-[4px] pl-[4px] pr-[12px] py-[12px] flex flex-col gap-[10px]">
                <div className="flex gap-[4px] items-start w-full">
                  <div className="opacity-0 relative shrink-0 size-[20px]" />
                  <div className="flex flex-1 gap-[16px] items-center">
                    <p className="font-['DS_Indigo:Bold',_sans-serif] leading-[1.25] text-[40px] text-black" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '40px', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.32px' }}>
                      4
                    </p>
                    <div className="flex flex-col gap-[4px]">
                      <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.25] text-[16px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
                        Expiring agreements
                      </p>
                      <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] text-[14px] text-[rgba(30,24,30,0.7)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>
                        next 90 Days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Renewing agreements */}
              <div className="flex-1 border border-[rgba(30,24,30,0.1)] rounded-[4px] pl-[4px] pr-[12px] py-[12px] flex flex-col gap-[10px]">
                <div className="flex gap-[4px] items-start w-full">
                  <div className="opacity-0 relative shrink-0 size-[20px]" />
                  <div className="flex flex-1 gap-[16px] items-center">
                    <p className="font-['DS_Indigo:Bold',_sans-serif] leading-[1.25] text-[40px] text-black" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '40px', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.32px' }}>
                      0
                    </p>
                    <div className="flex flex-col gap-[4px]">
                      <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.25] text-[16px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
                        Renewing agreements
                      </p>
                      <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] text-[14px] text-[rgba(30,24,30,0.7)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>
                        Next 90 Days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Your Agreements */}
          <div className="flex flex-col gap-[12px]">
            <SectionHeader title="Review your agreements" showMenuButton onMenuClick={() => console.log('Menu clicked')} />
            <div className="flex gap-[24px]">
              <div className="bg-[#f0f0f0] rounded-[8px] h-[338px] w-[487px] flex items-center justify-center">
                <p className="text-[rgba(30,24,30,0.3)]">Chart Placeholder</p>
              </div>
              <div className="bg-[#f0f0f0] rounded-[8px] h-[338px] flex-1 flex items-center justify-center">
                <p className="text-[rgba(30,24,30,0.3)]">Chart Placeholder</p>
              </div>
            </div>
          </div>

          {/* Explore Docusign Insights */}
          <div className="flex flex-col gap-[16px]">
            <SectionHeader title="Explore Docusign Insights" />
            <div className="flex gap-[16px] w-full">
              {defaultExploreItems.map((item) => (
                <ExploreCard
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  buttonLabel={item.buttonLabel}
                />
              ))}
            </div>
          </div>

          {/* Your Impact */}
          <div className="flex flex-col gap-[12px]">
            <SectionHeader title="Your Impact" showMenuButton onMenuClick={() => console.log('Menu clicked')} />
            <div className="bg-[#f8f3f0] rounded-[8px] px-[64px] py-0 flex items-end justify-between">
              <div className="flex flex-col gap-[55px] h-[381px] justify-center w-[602px]">
                {/* Top row */}
                <div className="flex gap-[92px]">
                  <div className="flex flex-col w-[229px]">
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.25] text-[56px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '56px', fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.32px' }}>
                      2,103
                    </p>
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.25] text-[24px] text-[rgba(30,24,30,0.7)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '24px', fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
                      Pages of paper saved
                    </p>
                  </div>
                  <div className="flex flex-col w-[281px]">
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.25] text-[56px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '56px', fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.32px' }}>
                      191 lb
                    </p>
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.25] text-[24px] text-[rgba(30,24,30,0.7)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '24px', fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
                      Carbon emissions reduced
                    </p>
                  </div>
                </div>
                {/* Bottom row */}
                <div className="flex gap-[92px]">
                  <div className="flex flex-col w-[229px]">
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.25] text-[56px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '56px', fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.32px' }}>
                      13 lb
                    </p>
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.25] text-[24px] text-[rgba(30,24,30,0.7)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '24px', fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
                      Waste eliminated
                    </p>
                  </div>
                  <div className="flex flex-col w-[281px]">
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.25] text-[56px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '56px', fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.32px' }}>
                      81 lb
                    </p>
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.25] text-[24px] text-[rgba(30,24,30,0.7)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '24px', fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
                      Wood saved
                    </p>
                  </div>
                </div>
              </div>
              {/* Impact image placeholder */}
              <div className="h-[381px] w-[252px] bg-[#d4c4b0] rounded-[8px] flex items-center justify-center">
                <p className="text-[rgba(30,24,30,0.3)]">Impact Image</p>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-[8px]">
            <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] text-[14px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>
              Resources
            </p>
            <div className="flex gap-[16px]">
              <button className="bg-[rgba(30,24,30,0.05)] h-[40px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[rgba(30,24,30,0.1)] transition-all flex items-center gap-[8px]">
                <div className="relative shrink-0 size-[24px]">
                  <div className="absolute left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/cc97406f-b145-4050-af1a-810cedbb8dd3" />
                  </div>
                </div>
                <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.5] text-[16px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: 1.5 }}>
                  Suggest a feature
                </p>
              </button>
              <button className="bg-[rgba(30,24,30,0.05)] h-[40px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[rgba(30,24,30,0.1)] transition-all flex items-center gap-[8px]">
                <div className="overflow-clip relative shrink-0 size-[24px]">
                  <div className="absolute left-1/2 size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/d15a0a86-4996-4e26-906e-e3a7ed3a12fd" />
                  </div>
                </div>
                <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.25] text-[16px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
                  Submit Feedback
                </p>
              </button>
              <button className="bg-[rgba(30,24,30,0.05)] h-[40px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[rgba(30,24,30,0.1)] transition-all flex items-center gap-[8px]">
                <div className="overflow-clip relative shrink-0 size-[24px]">
                  <div className="absolute left-1/2 size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/5fa79546-dac7-4b1c-bd0b-4dbc6adf5fac" />
                  </div>
                </div>
                <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.25] text-[16px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
                  Join Docusign Community
                </p>
              </button>
              <button className="bg-[rgba(30,24,30,0.05)] h-[40px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[rgba(30,24,30,0.1)] transition-all flex items-center gap-[8px]">
                <div className="relative shrink-0 size-[24px]">
                  <div className="absolute left-1/2 size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/cf2ad151-abb3-4ea7-bea6-c2cf95ef39cb" />
                  </div>
                </div>
                <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.5] text-[16px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: 1.5 }}>
                  Help Docs
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
