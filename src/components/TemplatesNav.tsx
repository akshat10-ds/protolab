export function TemplatesNav({ selectedPage, onPageSelect }: { selectedPage: string; onPageSelect: (page: string) => void }) {
  const navItems = [
    { id: 'my-templates', label: 'My Templates' },
    { id: 'shared-templates', label: 'Shared with me' },
    { id: 'company-templates', label: 'Company Templates' },
    { id: 'public-templates', label: 'Public Templates' },
    { id: 'recent-templates', label: 'Recently Used' },
    { id: 'favorite-templates', label: 'Favorites' },
  ];

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Templates Nav Items">
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-0 relative shrink-0 w-[280px]">
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
            <div className="box-border content-stretch flex gap-[4px] h-[48px] items-center max-h-[48px] max-w-[280px] min-h-[48px] min-w-[88px] pl-[16px] pr-[24px] py-[16px] relative shrink-0 w-[280px]">
              <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex items-center pl-[8px] pr-0 py-0 relative w-full">
                    <p className="[white-space-collapse:collapse] basis-0 grow h-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[rgba(25,24,35,0.9)] text-nowrap" style={{ fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>Templates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {navItems.map((item) => (
        <div key={item.id} className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          <div 
            className={`box-border content-stretch flex gap-[4px] h-[48px] items-center max-h-[48px] max-w-[280px] min-h-[48px] min-w-[88px] pl-[16px] pr-[24px] py-[16px] relative shrink-0 w-[280px] cursor-pointer transition-all duration-200 rounded-[var(--radius-button)] ${
              selectedPage === item.id 
                ? 'bg-[var(--muted)]' 
                : 'hover:bg-[var(--muted)]'
            }`}
            style={{
              backgroundColor: selectedPage === item.id ? 'var(--muted)' : undefined
            }}
            onMouseEnter={(e) => {
              if (selectedPage !== item.id) {
                e.currentTarget.style.backgroundColor = 'var(--muted)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPage !== item.id) {
                e.currentTarget.style.backgroundColor = '';
              }
            }}
            onClick={() => onPageSelect(item.id)}
          >
            <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex items-center pl-[8px] pr-0 py-0 relative w-full">
                  <p className="[white-space-collapse:collapse] basis-0 grow h-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[rgba(25,24,35,0.9)] text-nowrap" style={{ fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-regular)' }}>{item.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
