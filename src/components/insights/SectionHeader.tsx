export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
}

export function SectionHeader({ title, actionLabel, onActionClick, showMenuButton, onMenuClick }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full h-[32px]">
      <h3 className="font-['DS_Indigo:SemiBold',_sans-serif] leading-[1.25] text-[20px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: 1.25 }}>
        {title}
      </h3>

      <div className="flex items-center gap-[8px]">
        {actionLabel && (
          <button
            onClick={onActionClick}
            className="bg-transparent border border-[rgba(26,29,32,0.15)] border-solid content-stretch flex items-center justify-center h-[32px] px-[16px] py-[8px] relative rounded-[var(--radius-button)] shrink-0 cursor-pointer transition-all duration-200 hover:bg-[var(--muted)]"
          >
            <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.5] relative shrink-0 text-[14px] text-[rgba(19,0,50,0.9)] text-center whitespace-nowrap" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.5 }}>
              {actionLabel}
            </p>
          </button>
        )}

        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="bg-transparent content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[32px] cursor-pointer transition-all duration-200 hover:bg-[var(--muted)]"
          >
            <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative shrink-0">
              <div className="absolute h-[4px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[16px]">
                <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/bb33e417-4738-4960-8fa2-446912efd62e" />
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
