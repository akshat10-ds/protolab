export interface ExploreCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick?: () => void;
}

export function ExploreCard({ icon, title, description, buttonLabel, onButtonClick }: ExploreCardProps) {
  return (
    <div className="border border-[rgba(30,24,30,0.1)] border-solid box-border flex flex-1 flex-col gap-[8px] items-start min-h-px min-w-px relative rounded-[4px] shrink-0">
      {/* Icon Section */}
      <div className="relative h-[200px] w-full shrink-0" style={{ backgroundColor: '#f7f6f7' }}>
        {icon}
      </div>

      {/* Content Section */}
      <div className="box-border flex flex-col gap-[16px] items-start justify-center px-[12px] py-[16px] relative shrink-0 w-full">
        <div className="flex flex-col gap-[8px] items-start w-full">
          <div className="flex flex-col gap-[4px] items-start">
            <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.25] text-[16px] text-[rgba(30,24,30,0.9)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.16px' }}>
              {title}
            </p>
            <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] text-[14px] text-[rgba(30,24,30,0.7)]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>
              {description}
            </p>
          </div>
        </div>

        <button
          onClick={onButtonClick}
          className="box-border flex gap-[4px] h-[32px] items-center justify-center min-w-[80px] px-[8px] py-[6px] relative rounded-[4px] shrink-0 cursor-pointer transition-all duration-200 hover:opacity-80"
          style={{ backgroundColor: 'rgba(19,0,50,0.05)' }}
        >
          <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.4] relative shrink-0 text-[14px] text-[rgba(19,0,50,0.9)] text-center" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>
            {buttonLabel}
          </p>
        </button>
      </div>
    </div>
  );
}
