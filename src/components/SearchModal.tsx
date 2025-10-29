import React, { useState } from 'react';
import svgPaths from "../imports/svg-75yhy2d749";
import imgBlinkingCursor from "figma:asset/c15fce950ce25a720907b0111d6fb756fc298c2d.png";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchValue, setSearchValue] = useState('');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[100px]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative backdrop-blur backdrop-filter bg-white rounded-[var(--radius-card)] shadow-[0px_8px_32px_0px_rgba(19,0,50,0.3)] w-[900px] max-h-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[12px] isolate items-start pb-0 pt-[80px] px-[24px] relative size-full">
            {/* Palette Header */}
            <div className="absolute content-stretch flex flex-col items-center left-0 top-0 z-[2] w-full">
              {/* Close Button */}
              <div className="absolute content-stretch flex items-start justify-end right-[16px] rounded-[var(--radius-button)] top-[20px]">
                <div 
                  className="bg-transparent box-border content-stretch flex items-center justify-center px-0 py-[8px] relative rounded-[var(--radius-button)] shrink-0 size-[40px] cursor-pointer hover:bg-[var(--muted)] transition-all duration-200" 
                  onClick={onClose}
                >
                  <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0">
                    <div className="absolute left-1/2 size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p27f5d00} fill="var(--foreground)" fillOpacity="0.9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="bg-white box-border content-stretch flex gap-[8px] items-center pb-[8px] pl-0 pr-[56px] pt-[16px] relative shrink-0 w-[828px]">
                {/* Text Box */}
                <div className="basis-0 content-stretch flex flex-col gap-[4px] grow h-[48px] items-start min-h-px min-w-px relative shrink-0">
                  <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0 w-full">
                    {/* Input */}
                    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[9999px] shrink-0">
                      <div className="flex flex-row items-center size-full">
                        <div className="box-border content-stretch flex items-center px-[4px] py-0 relative size-full">
                          <div className="basis-0 content-stretch flex grow h-full items-center min-h-px min-w-px relative shrink-0">
                            <div className="bg-transparent content-stretch flex flex-col items-center justify-center relative rounded-bl-[var(--radius-button)] rounded-br-[var(--radius-button)] rounded-tl-[12px] rounded-tr-[var(--radius-button)] shrink-0 size-[40px]">
                              <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                                <div className="absolute left-1/2 size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                    <path d={svgPaths.p38479700} fill="var(--accent)" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Settings Icon */}
                    <div className="bg-transparent content-stretch flex flex-col items-center justify-center relative rounded-[var(--radius-button)] shrink-0 size-[40px] cursor-pointer hover:bg-[var(--muted)] transition-all duration-200">
                      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                        <div className="absolute left-1/2 size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <path d={svgPaths.p10498980} fill="var(--foreground)" fillOpacity="0.9" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "36", "--transform-inner-height": "1" } as React.CSSProperties}>
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-px relative w-[36px]">
                      <div aria-hidden="true" className="absolute border border-[rgba(19,0,50,0.1)] border-solid inset-0 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                {/* Search Input with Cursor */}
                <div className="absolute content-stretch flex items-start left-[52px] top-[calc(50%+4px)] translate-y-[-50%] w-[671px]">
                  <div className="h-[24px] overflow-clip relative shrink-0 w-[2px]">
                    <div className="absolute inset-0 mix-blend-multiply">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBlinkingCursor} />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Try a keyword, phrases, or a question"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1 outline-none bg-transparent text-[var(--foreground)] opacity-70 placeholder:text-[var(--foreground)] placeholder:opacity-70 border-none"
                    autoFocus
                    style={{ marginLeft: '4px' }}
                  />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="content-stretch flex flex-col gap-[7px] h-[4px] items-start overflow-clip relative shrink-0 w-[860px]">
                <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-1/2 top-0 translate-x-[-50%] w-[876px]">
                  <div className="content-stretch flex h-[4px] items-center overflow-clip relative rounded-[9999px] shrink-0 w-full">
                    <div className="absolute bg-[rgba(19,0,50,0.5)] right-0 rounded-[9999px] size-[4px] top-0" />
                    <div className="basis-0 bg-[rgba(19,0,50,0.1)] content-stretch flex grow h-[4px] items-center min-h-px min-w-px relative shrink-0">
                      <div className="basis-0 bg-[var(--accent)] grow h-full min-h-px min-w-px relative shrink-0" style={{ width: '90%' }}>
                        <div aria-hidden="true" className="absolute border-[0px_2px] border-solid border-white bottom-0 left-[-2px] pointer-events-none right-[-2px] top-0" />
                      </div>
                      <div className="h-[4px] shrink-0 w-[0.001px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="box-border content-stretch flex flex-col gap-[12px] items-start pb-[16px] pt-[8px] px-0 relative shrink-0 w-full z-[1] overflow-y-auto max-h-[450px]">
              {/* Recently accessed section */}
              <div className="box-border content-stretch flex flex-col gap-[4px] items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full">
                {/* Section header */}
                <div className="box-border content-stretch flex items-center justify-between px-0 py-[8px] relative shrink-0 w-full">
                  <p className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[var(--muted-foreground)]">Recently accessed</p>
                </div>
                
                {/* Row 1 - Review MSA Changes Form */}
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                  <div className="basis-0 grow min-h-[32px] min-w-px relative rounded-[var(--radius-button)] shrink-0 hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer">
                    <div className="flex flex-row items-center min-h-inherit size-full">
                      <div className="box-border content-stretch flex items-center min-h-inherit pl-[16px] pr-[8px] py-[8px] relative w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <div className="size-full">
                            <div className="box-border content-stretch flex gap-[8px] items-start pl-0 pr-[12px] py-0 relative w-full">
                              <div className="relative shrink-0 size-[20px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                  <g clipPath="url(#clip0_16_6427)">
                                    <path d={svgPaths.p17242340} fill="var(--accent)" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_16_6427">
                                      <rect fill="white" height="20" width="20" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px overflow-clip relative self-stretch shrink-0 text-nowrap">
                                <p className="[white-space-collapse:collapse] leading-[1.5] overflow-ellipsis overflow-hidden relative shrink-0 w-full text-[var(--foreground)]">Review MSA Changes Form</p>
                                <div className="leading-[1.4] overflow-ellipsis overflow-hidden relative shrink-0 w-full">
                                  <p className="[white-space-collapse:collapse] mb-0 overflow-ellipsis overflow-hidden text-[var(--muted-foreground)]">General Request ・ New ・ From: John Submitter</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden right-[16px] text-[var(--muted-foreground)] text-nowrap text-right top-1/2 translate-y-[-50%] caption">
                    <p className="leading-[1.5] overflow-ellipsis overflow-hidden whitespace-pre">14 hours ago</p>
                  </div>
                </div>

                {/* Row 2 - Master Services Agreement */}
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                  <div className="basis-0 grow min-h-[32px] min-w-px relative rounded-[var(--radius-button)] shrink-0 hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer">
                    <div className="flex flex-row items-center min-h-inherit size-full">
                      <div className="box-border content-stretch flex items-center min-h-inherit pl-[16px] pr-[8px] py-[8px] relative w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <div className="size-full">
                            <div className="box-border content-stretch flex gap-[8px] items-start pl-0 pr-[12px] py-0 relative w-full">
                              <div className="relative shrink-0 size-[20px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                  <path d={svgPaths.p2e4c3100} fill="var(--accent)" />
                                </svg>
                              </div>
                              <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px overflow-clip relative self-stretch shrink-0 text-nowrap">
                                <p className="[white-space-collapse:collapse] leading-[1.5] overflow-ellipsis overflow-hidden relative shrink-0 w-full text-[var(--foreground)]">Master Services Agreement - DataVault</p>
                                <p className="[white-space-collapse:collapse] leading-[1.4] overflow-ellipsis overflow-hidden relative shrink-0 w-full text-[var(--muted-foreground)]">
                                  <span>BloomEnergy Corp</span>
                                  <span>{` ・ `}</span>
                                  <span>Active ・ Expires 1/14/2026</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden right-[16px] text-[var(--muted-foreground)] text-nowrap text-right top-1/2 translate-y-[-50%] caption">
                    <p className="leading-[1.5] overflow-ellipsis overflow-hidden whitespace-pre">5 days ago</p>
                  </div>
                </div>

                {/* Row 3 - SOW #142 */}
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                  <div className="basis-0 grow min-h-[32px] min-w-px relative rounded-[var(--radius-button)] shrink-0 hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer">
                    <div className="flex flex-row items-center min-h-inherit size-full">
                      <div className="box-border content-stretch flex items-center min-h-inherit pl-[16px] pr-[8px] py-[8px] relative w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <div className="size-full">
                            <div className="box-border content-stretch flex gap-[8px] items-start pl-0 pr-[12px] py-0 relative w-full">
                              <div className="relative shrink-0 size-[20px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                  <path d={svgPaths.p1691ba00} fill="var(--accent)" />
                                </svg>
                              </div>
                              <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px overflow-clip relative self-stretch shrink-0 text-nowrap">
                                <p className="[white-space-collapse:collapse] leading-[1.5] overflow-ellipsis overflow-hidden relative shrink-0 w-full text-[var(--foreground)]">SOW #142 for BloomEnergy Data Vaults</p>
                                <p className="[white-space-collapse:collapse] leading-[1.4] overflow-ellipsis overflow-hidden relative shrink-0 w-full text-[var(--muted-foreground)]">Waiting for Others</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden right-[16px] text-[var(--muted-foreground)] text-nowrap text-right top-1/2 translate-y-[-50%] caption">
                    <p className="leading-[1.5] overflow-ellipsis overflow-hidden whitespace-pre">2 hours ago</p>
                  </div>
                </div>

                {/* Row 4 - Q3 Order Form */}
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                  <div className="box-border content-stretch flex items-center min-h-[32px] pl-[16px] pr-[8px] py-[12px] relative rounded-[var(--radius-button)] shrink-0 w-[828px] hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer">
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                      <div className="size-full">
                        <div className="box-border content-stretch flex gap-[8px] items-start pl-0 pr-[12px] py-0 relative w-full">
                          <div className="relative shrink-0 size-[20px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                              <path d={svgPaths.p2e4c3100} fill="var(--accent)" />
                            </svg>
                          </div>
                          <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px overflow-clip relative self-stretch shrink-0 text-nowrap">
                            <p className="[white-space-collapse:collapse] leading-[1.5] overflow-ellipsis overflow-hidden relative shrink-0 w-full text-[var(--foreground)]">Q3 Order Form for BloomEnergy</p>
                            <p className="[white-space-collapse:collapse] leading-[1.4] overflow-ellipsis overflow-hidden relative shrink-0 w-full text-[var(--muted-foreground)]">
                              Order Form ・ Active ・ Renews 2/24/2026 ・ $1.2M Annually
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden right-[16px] text-[var(--muted-foreground)] text-nowrap text-right top-1/2 translate-y-[-50%] caption">
                    <p className="leading-[1.5] overflow-ellipsis overflow-hidden whitespace-pre">2 hours ago</p>
                  </div>
                </div>

                {/* Row 5 - Complete with Docusign */}
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                  <div className="basis-0 grow min-h-[32px] min-w-px relative rounded-[var(--radius-button)] shrink-0 hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer">
                    <div className="flex flex-row items-center min-h-inherit size-full">
                      <div className="box-border content-stretch flex items-center min-h-inherit pl-[16px] pr-[8px] py-[8px] relative w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <div className="size-full">
                            <div className="box-border content-stretch flex gap-[8px] items-start pl-0 pr-[12px] py-0 relative w-full">
                              <div className="relative shrink-0 size-[20px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                  <path d={svgPaths.p1691ba00} fill="var(--accent)" />
                                </svg>
                              </div>
                              <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px overflow-clip relative self-stretch shrink-0 text-nowrap">
                                <p className="[white-space-collapse:collapse] leading-[1.5] overflow-ellipsis overflow-hidden relative shrink-0 w-full text-[var(--foreground)]">Complete with Docusign: Q3 2025 DPA Amendment for BloomEnergy</p>
                                <p className="[white-space-collapse:collapse] leading-[1.4] overflow-ellipsis overflow-hidden relative shrink-0 w-full text-[var(--muted-foreground)]">Draft</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden right-[16px] text-[var(--muted-foreground)] text-nowrap text-right top-1/2 translate-y-[-50%] caption">
                    <p className="leading-[1.5] overflow-ellipsis overflow-hidden whitespace-pre">2 days ago</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="content-stretch flex flex-col gap-[7px] h-px items-start relative shrink-0 w-full">
                <div className="absolute h-px left-1/2 top-0 translate-x-[-50%] w-[860px]">
                  <div aria-hidden="true" className="absolute border border-[rgba(19,0,50,0.1)] border-solid inset-0 pointer-events-none" />
                </div>
              </div>

              {/* Search in section */}
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                {/* Search in Completed Documents */}
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                  <div className="basis-0 grow min-h-[32px] min-w-px relative rounded-[var(--radius-button)] shrink-0 hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer">
                    <div className="flex flex-row items-center min-h-inherit size-full">
                      <div className="box-border content-stretch flex items-center min-h-inherit px-[16px] py-[12px] relative w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <div className="size-full">
                            <div className="box-border content-stretch flex gap-[8px] items-start pl-0 pr-[12px] py-0 relative w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex gap-[4px] items-center left-[44px] top-1/2 translate-y-[-50%]">
                    <div className="flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-nowrap text-[var(--muted-foreground)]">
                      <p className="leading-[1.5] overflow-ellipsis overflow-hidden">Search in</p>
                    </div>
                    <div className="relative shrink-0 size-[20px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p39529900} fill="var(--foreground)" fillOpacity="0.9" />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-nowrap text-[var(--foreground)]">
                      <p className="leading-[1.5] overflow-ellipsis overflow-hidden whitespace-pre">Completed Documents</p>
                    </div>
                  </div>
                </div>

                {/* Search in In Progress Envelopes */}
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                  <div className="basis-0 grow min-h-[32px] min-w-px relative rounded-[var(--radius-button)] shrink-0 hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer">
                    <div className="flex flex-row items-center min-h-inherit size-full">
                      <div className="box-border content-stretch flex items-center min-h-inherit px-[16px] py-[12px] relative w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <div className="size-full">
                            <div className="box-border content-stretch flex gap-[8px] items-start pl-0 pr-[12px] py-0 relative w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex gap-[4px] items-center left-[44px] top-1/2 translate-y-[-50%]">
                    <div className="flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-nowrap text-[var(--muted-foreground)]">
                      <p className="leading-[1.5] overflow-ellipsis overflow-hidden">Search in</p>
                    </div>
                    <div className="relative shrink-0 size-[20px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p33c63400} fill="var(--foreground)" fillOpacity="0.9" />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-nowrap text-[var(--foreground)]">
                      <p className="leading-[1.5] overflow-ellipsis overflow-hidden whitespace-pre">In Progress Envelopes</p>
                    </div>
                  </div>
                </div>

                {/* Search in Parties */}
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                  <div className="basis-0 grow min-h-[32px] min-w-px relative rounded-[var(--radius-button)] shrink-0 hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer">
                    <div className="flex flex-row items-center min-h-inherit size-full">
                      <div className="box-border content-stretch flex items-center min-h-inherit px-[16px] py-[12px] relative w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <div className="size-full">
                            <div className="box-border content-stretch flex gap-[8px] items-start pl-0 pr-[12px] py-0 relative w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex gap-[4px] items-center left-[44px] top-1/2 translate-y-[-50%]">
                    <div className="flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-nowrap text-[var(--muted-foreground)]">
                      <p className="leading-[1.5] overflow-ellipsis overflow-hidden">Search in</p>
                    </div>
                    <div className="relative shrink-0 size-[20px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p2e2a0b70} fill="var(--foreground)" fillOpacity="0.9" />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-nowrap text-[var(--foreground)]">
                      <p className="leading-[1.5] overflow-ellipsis overflow-hidden whitespace-pre">Parties</p>
                    </div>
                  </div>
                </div>

                {/* Search in Requests */}
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                  <div className="basis-0 grow min-h-[32px] min-w-px relative rounded-[var(--radius-button)] shrink-0 hover:bg-[var(--muted)] transition-all duration-200 cursor-pointer">
                    <div className="flex flex-row items-center min-h-inherit size-full">
                      <div className="box-border content-stretch flex items-center min-h-inherit px-[16px] py-[12px] relative w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <div className="size-full">
                            <div className="box-border content-stretch flex gap-[8px] items-start pl-0 pr-[12px] py-0 relative w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex gap-[4px] items-center left-[44px] top-1/2 translate-y-[-50%]">
                    <div className="flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-nowrap text-[var(--muted-foreground)]">
                      <p className="leading-[1.5] overflow-ellipsis overflow-hidden">Search in</p>
                    </div>
                    <div className="relative shrink-0 size-[20px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p31d3de80} fill="var(--foreground)" fillOpacity="0.9" />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-nowrap text-[var(--foreground)]">
                      <p className="leading-[1.5] overflow-ellipsis overflow-hidden whitespace-pre">Requests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
