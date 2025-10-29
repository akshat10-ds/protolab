"use client";

import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default function FilterSidebar() {
  const [statusFilters, setStatusFilters] = useState({
    completed: true,
    inProgress: false,
    voided: false,
  });

  const [documentTypeFilters, setDocumentTypeFilters] = useState({
    contracts: false,
    agreements: false,
    forms: false,
    other: false,
  });

  const [dateRange, setDateRange] = useState("last30days");

  const handleClearAll = () => {
    setStatusFilters({
      completed: false,
      inProgress: false,
      voided: false,
    });
    setDocumentTypeFilters({
      contracts: false,
      agreements: false,
      forms: false,
      other: false,
    });
    setDateRange("");
  };

  return (
    <div className="w-[320px] bg-card border-l border-border h-full flex flex-col shrink-0">
      {/* Header */}
      <div className="px-[16px] py-[16px] border-b border-border">
        <div className="flex items-center justify-between mb-[16px]">
          <h2 className="text-card-foreground">Filters</h2>
          <button 
            onClick={handleClearAll}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-auto px-[16px] py-[16px]">
        <div className="space-y-[24px]">
          {/* Status Filter */}
          <div>
            <h3 className="text-card-foreground mb-[12px]">Status</h3>
            <div className="space-y-[8px]">
              <div className="flex items-center gap-[8px]">
                <Checkbox 
                  id="status-completed"
                  checked={statusFilters.completed}
                  onCheckedChange={(checked) => 
                    setStatusFilters({ ...statusFilters, completed: checked as boolean })
                  }
                />
                <Label htmlFor="status-completed" className="cursor-pointer text-card-foreground">
                  Completed
                </Label>
              </div>
              <div className="flex items-center gap-[8px]">
                <Checkbox 
                  id="status-in-progress"
                  checked={statusFilters.inProgress}
                  onCheckedChange={(checked) => 
                    setStatusFilters({ ...statusFilters, inProgress: checked as boolean })
                  }
                />
                <Label htmlFor="status-in-progress" className="cursor-pointer text-card-foreground">
                  In Progress
                </Label>
              </div>
              <div className="flex items-center gap-[8px]">
                <Checkbox 
                  id="status-voided"
                  checked={statusFilters.voided}
                  onCheckedChange={(checked) => 
                    setStatusFilters({ ...statusFilters, voided: checked as boolean })
                  }
                />
                <Label htmlFor="status-voided" className="cursor-pointer text-card-foreground">
                  Voided
                </Label>
              </div>
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <h3 className="text-card-foreground mb-[12px]">Date Range</h3>
            <div className="space-y-[8px]">
              <div className="flex items-center gap-[8px]">
                <input 
                  type="radio" 
                  id="date-30"
                  name="dateRange" 
                  className="w-[16px] h-[16px] accent-primary cursor-pointer"
                  checked={dateRange === "last30days"}
                  onChange={() => setDateRange("last30days")}
                />
                <Label htmlFor="date-30" className="cursor-pointer text-card-foreground">
                  Last 30 days
                </Label>
              </div>
              <div className="flex items-center gap-[8px]">
                <input 
                  type="radio" 
                  id="date-90"
                  name="dateRange" 
                  className="w-[16px] h-[16px] accent-primary cursor-pointer"
                  checked={dateRange === "last90days"}
                  onChange={() => setDateRange("last90days")}
                />
                <Label htmlFor="date-90" className="cursor-pointer text-card-foreground">
                  Last 90 days
                </Label>
              </div>
              <div className="flex items-center gap-[8px]">
                <input 
                  type="radio" 
                  id="date-custom"
                  name="dateRange" 
                  className="w-[16px] h-[16px] accent-primary cursor-pointer"
                  checked={dateRange === "custom"}
                  onChange={() => setDateRange("custom")}
                />
                <Label htmlFor="date-custom" className="cursor-pointer text-card-foreground">
                  Custom range
                </Label>
              </div>
            </div>
          </div>

          {/* Document Type Filter */}
          <div>
            <h3 className="text-card-foreground mb-[12px]">Document Type</h3>
            <div className="space-y-[8px]">
              <div className="flex items-center gap-[8px]">
                <Checkbox 
                  id="doc-contracts"
                  checked={documentTypeFilters.contracts}
                  onCheckedChange={(checked) => 
                    setDocumentTypeFilters({ ...documentTypeFilters, contracts: checked as boolean })
                  }
                />
                <Label htmlFor="doc-contracts" className="cursor-pointer text-card-foreground">
                  Contracts
                </Label>
              </div>
              <div className="flex items-center gap-[8px]">
                <Checkbox 
                  id="doc-agreements"
                  checked={documentTypeFilters.agreements}
                  onCheckedChange={(checked) => 
                    setDocumentTypeFilters({ ...documentTypeFilters, agreements: checked as boolean })
                  }
                />
                <Label htmlFor="doc-agreements" className="cursor-pointer text-card-foreground">
                  Agreements
                </Label>
              </div>
              <div className="flex items-center gap-[8px]">
                <Checkbox 
                  id="doc-forms"
                  checked={documentTypeFilters.forms}
                  onCheckedChange={(checked) => 
                    setDocumentTypeFilters({ ...documentTypeFilters, forms: checked as boolean })
                  }
                />
                <Label htmlFor="doc-forms" className="cursor-pointer text-card-foreground">
                  Forms
                </Label>
              </div>
              <div className="flex items-center gap-[8px]">
                <Checkbox 
                  id="doc-other"
                  checked={documentTypeFilters.other}
                  onCheckedChange={(checked) => 
                    setDocumentTypeFilters({ ...documentTypeFilters, other: checked as boolean })
                  }
                />
                <Label htmlFor="doc-other" className="cursor-pointer text-card-foreground">
                  Other
                </Label>
              </div>
            </div>
          </div>

          {/* Sender Filter */}
          <div>
            <h3 className="text-card-foreground mb-[12px]">Sender</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search senders..."
                className="w-full px-[12px] py-[8px] border border-border rounded-[var(--radius-button)] bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-[16px] py-[16px] border-t border-border flex gap-[8px]">
        <button className="flex-1 px-[16px] py-[8px] border border-border rounded-[var(--radius-button)] text-secondary-foreground hover:bg-muted transition-colors">
          Cancel
        </button>
        <button className="flex-1 px-[16px] py-[8px] bg-accent text-accent-foreground rounded-[var(--radius-button)] hover:opacity-90 transition-opacity">
          Apply
        </button>
      </div>
    </div>
  );
}
