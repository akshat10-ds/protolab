import { useState } from 'react';
import { GenericDataTable, TableColumn } from './GenericDataTable';

interface WebForm {
  id: string;
  name: string;
  subtitle: string;
  status: 'Active' | 'Inactive';
  lastChanged: string;
  time: string;
}

const sampleForms: WebForm[] = [
  {
    id: '1',
    name: 'New Account Opening',
    subtitle: 'eSignature Form',
    status: 'Active',
    lastChanged: '12/19/2024',
    time: '2:00 AM'
  },
  {
    id: '2',
    name: 'Change of Beneficiary',
    subtitle: 'eSignature Form',
    status: 'Active',
    lastChanged: '12/19/2024',
    time: '2:00 AM'
  },
  {
    id: '3',
    name: 'Account Transfer',
    subtitle: 'eSignature Form',
    status: 'Active',
    lastChanged: '12/19/2024',
    time: '2:00 AM'
  },
  {
    id: '4',
    name: 'Add/Remove Joint Owner',
    subtitle: 'eSignature Form',
    status: 'Active',
    lastChanged: '12/19/2024',
    time: '2:00 AM'
  }
];

export function TemplatesContent({ selectedPage }: { selectedPage: string }) {
  const [showBanner, setShowBanner] = useState(true);

  const columns: TableColumn<WebForm>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      resizable: true,
      defaultWidth: 40,
      renderCell: (form) => (
        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px not-italic relative shrink-0">
          <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.5] overflow-ellipsis overflow-hidden relative shrink-0 text-[#1e1e1e] text-[14px] w-full" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: 1.5 }}>{form.name}</p>
          <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.5] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-[rgba(25,24,35,0.65)] w-full" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '12px', fontWeight: 400, lineHeight: 1.5 }}>
            {form.subtitle}
          </p>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      resizable: true,
      defaultWidth: 30,
      renderCell: (form) => (
        <div className="bg-transparent box-border content-stretch flex flex-col gap-[4px] h-[72px] items-start justify-center px-[16px] py-[20px] relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="w-[12px] h-[12px] rounded-full bg-[#188038]"></div>
            <span className="font-['DS_Indigo:Regular',_sans-serif] text-[14px] leading-[1.4] text-[rgba(19,0,50,0.9)]">
              {form.status}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'lastChanged',
      header: 'Last Changed',
      sortable: true,
      resizable: true,
      defaultWidth: 30,
      renderCell: (form) => (
        <div className="bg-transparent content-stretch flex flex-col h-[72px] items-start justify-center px-[16px] py-[8px] relative shrink-0">
          <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-[rgba(19,0,50,0.9)]">
            {form.lastChanged}
          </p>
          <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-[rgba(19,0,50,0.65)]">
            {form.time}
          </p>
        </div>
      )
    }
  ];

  const templateSuggestions = [
    'Create a form to collect date of birth, email, gender and phone number.',
    'Create a form to collect feedback from customers at a restaurant.',
    'Create a form to collect information of a new bank customer.'
  ];

  return (
    <div className="bg-white relative size-full" data-name="Templates Content">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pb-0 pl-[32px] pr-[48px] pt-[32px] relative size-full">
          {/* Page Title and Actions */}
          <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full" data-name="Page Title+Actions">
            <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
              <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[rgba(25,24,35,0.9)] text-nowrap">
                <p className="leading-[1.25] whitespace-pre" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '32px', fontWeight: 400 }}>Web Forms</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
              <div className="bg-[#4C00FF] box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center min-w-[80px] px-[16px] py-[8px] relative rounded-[var(--radius-button)] shrink-0 cursor-pointer transition-all duration-200 hover:bg-[#3D00CC] hover:shadow-sm">
                <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white text-center text-nowrap whitespace-pre">New</p>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10L12 15L17 10H7Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>

          {/* Spacing like in MainContent */}
          <div className="h-[24px] relative shrink-0 w-full" />

          {/* Iris Banner */}
          {showBanner && (
            <div className="relative shrink-0 w-full mb-[24px]">
              <div className="border border-[rgba(26,29,32,0.15)] border-solid box-border content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[12px]">
                <div className="content-stretch flex gap-[8px] items-center justify-between relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0">
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <div className="relative shrink-0 size-[24px]">
                        <div className="absolute left-1/2 size-[18px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <div className="absolute inset-[-12.52%_-6.25%_-6.23%_-12.5%]">
                            <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/36e540d8-d1d8-4543-878e-769c84cce361" />
                          </div>
                          <div className="absolute bottom-[0.02%] left-0 right-0 top-[-0.02%]">
                            <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/ff51ff60-89c6-4a0c-a45f-394a1e5f56ce" />
                          </div>
                        </div>
                      </div>
                      <p className="font-['DS_Indigo:SemiBold',_sans-serif] leading-[1.25] relative shrink-0 text-[rgba(30,24,30,0.9)] text-[20px]" style={{ fontFamily: 'DSIndigo, sans-serif', fontSize: '20px', fontWeight: 600 }}>
                        Create forms with Iris
                      </p>
                    </div>
                    <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.25] not-italic relative shrink-0 text-[16px] text-[rgba(30,24,30,0.7)]">
                      You can now generate webforms through natural language with Iris
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBanner(false)}
                    className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[rgba(19,0,50,0.1)] rounded-[4px] transition-colors shrink-0 self-start"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="rgba(19,0,50,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                    {templateSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="bg-white border border-[rgba(19,0,50,0.1)] border-solid box-border content-stretch flex flex-1 gap-[10px] items-start min-w-0 p-[16px] relative rounded-[4px] self-stretch shrink cursor-pointer hover:border-[#7C3AED] hover:shadow-sm transition-all"
                      >
                        <p className="font-['DS_Indigo:Regular',_sans-serif] leading-[1.4] relative text-[14px] text-black">
                          {suggestion}
                        </p>
                      </div>
                    ))}
                    <div className="bg-white border border-[rgba(19,0,50,0.1)] border-solid box-border content-stretch flex flex-1 gap-[10px] items-start min-w-0 p-[16px] relative rounded-[4px] self-stretch shrink cursor-pointer hover:border-[#7C3AED] hover:shadow-sm transition-all">
                      <p className="font-['DS_Indigo:Italic',_sans-serif] leading-[1.4] not-italic relative text-[14px] text-[rgba(26,29,32,0.9)]">
                        Start from scratch
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Forms Table */}
          <div className="relative shrink-0 w-full">
            <GenericDataTable
              data={sampleForms}
              columns={columns}
              getItemId={(form) => form.id}
              enableCheckboxes={true}
              enableActions={true}
              actionsWidth={180}
              renderActions={(form) => (
                <>
                  <div className="bg-[rgba(204,255,0,0)] box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center min-w-[80px] px-[12px] py-[8px] relative rounded-[var(--radius-button)] shrink-0 cursor-pointer transition-all duration-200 hover:bg-[var(--muted)]">
                    <div aria-hidden="true" className="absolute border border-[var(--border)] border-solid inset-0 pointer-events-none rounded-[var(--radius-button)]" />
                    <p className="font-['DS_Indigo:Medium',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-[rgba(19,0,50,0.9)] text-center text-nowrap whitespace-pre">Send</p>
                  </div>
                  <div className="bg-[rgba(204,255,0,0)] content-stretch flex flex-col items-center justify-center relative rounded-[var(--radius-button)] shrink-0 size-[40px] cursor-pointer transition-all duration-200 hover:bg-[var(--muted)]">
                    <svg width="16" height="16" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z" fill="rgba(19,0,50,0.9)"/>
                    </svg>
                  </div>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
