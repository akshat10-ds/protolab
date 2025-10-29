export interface DashboardListItemProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export function DashboardListItem({ icon, title, onClick }: DashboardListItemProps) {
  return (
    <div
      className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onClick}
    >
      {icon}
      <div className="flex flex-col font-['DS_Indigo:Regular',_sans-serif] justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(19,0,50,0.9)] whitespace-nowrap" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 400 }}>
        <p className="leading-[1.4]">{title}</p>
      </div>
    </div>
  );
}
