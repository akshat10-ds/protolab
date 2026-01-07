import React, { useState } from 'react';
import {
  Inline,
  SearchInput,
  FileInput,
  ComboBox,
  DatePicker,
  FileUpload,
  FilterTag,
} from '@/design-system';
import type { FileInputFile, ComboBoxOption } from '@/design-system';
import styles from '../../Showcase.module.css';

export interface InputCompositesProps {
  activeSubpage: string;
}

// Data definitions for compact rendering
const comboBoxOptions: ComboBoxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid', disabled: true },
];

const dateFormats = [
  { format: 'MM/DD/YYYY', label: 'US Format' },
  { format: 'DD/MM/YYYY', label: 'European' },
  { format: 'YYYY-MM-DD', label: 'ISO' },
] as const;

const filterTags = ['All Items', 'In Progress', 'Completed'];
const techTags = ['React', 'TypeScript', 'Node.js'];
const categoryTags = ['Category', 'Status', 'Priority'];

export const InputComposites: React.FC<InputCompositesProps> = ({ activeSubpage }) => {
  // State for input composites
  const [searchValue, setSearchValue] = useState('');
  const [fileInputValue, setFileInputValue] = useState<FileInputFile[]>([]);
  const [comboBoxValue, setComboBoxValue] = useState('');
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(null);
  const [fileUploadFiles, setFileUploadFiles] = useState<FileInputFile[]>([]);

  if (activeSubpage === 'searchinput') {
    const suggestions = searchValue
      ? [
          { id: '1', label: 'React Components', description: 'Build reusable UI elements' },
          { id: '2', label: 'TypeScript Patterns', description: 'Type-safe development' },
          { id: '3', label: 'CSS Modules', description: 'Scoped styling solution' },
        ].filter((s) => s.label.toLowerCase().includes(searchValue.toLowerCase()))
      : [];

    return (
      <div className={styles.tokenPage}>
        {/* Default */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default Search</h3>
          </div>
          <div className={styles.interactiveArea}>
            <SearchInput
              placeholder="Search..."
              value={searchValue}
              onChange={setSearchValue}
            />
          </div>
        </div>

        {/* With Suggestions */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Suggestions</h3>
          </div>
          <div className={styles.interactiveArea}>
            <SearchInput
              placeholder="Search documentation..."
              value={searchValue}
              onChange={setSearchValue}
              suggestions={suggestions}
              onSuggestionSelect={(suggestion) => {
                setSearchValue(suggestion.label);
              }}
            />
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Loading</span>
              <SearchInput placeholder="Searching..." loading defaultValue="query" />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <SearchInput placeholder="Search..." disabled />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Not Clearable</span>
              <SearchInput placeholder="Search..." clearable={false} defaultValue="Fixed text" />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>With Search Handler</span>
              <SearchInput
                placeholder="Press Enter..."
                onSearch={(value) => alert(`Searching for: ${value}`)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'fileinput') {
    return (
      <div className={styles.tokenPage}>
        {/* Single File */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Single File</h3>
          </div>
          <div className={styles.interactiveArea}>
            <FileInput
              label="Upload Document"
              value={fileInputValue}
              onChange={setFileInputValue}
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>

        {/* Multiple Files */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Multiple Files</h3>
          </div>
          <div className={styles.interactiveArea}>
            <FileInput
              label="Upload Images"
              description="Select multiple image files"
              value={fileInputValue}
              onChange={setFileInputValue}
              accept="image/*"
              multiple
            />
          </div>
        </div>

        {/* With Size Limit */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Size Limit</h3>
          </div>
          <div className={styles.interactiveArea}>
            <FileInput
              label="Upload (Max 2MB)"
              value={fileInputValue}
              onChange={setFileInputValue}
              maxSize={2 * 1024 * 1024}
            />
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Error</span>
              <FileInput
                label="With Error"
                error="File size exceeds limit"
                value={[]}
                onChange={() => {}}
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <FileInput label="Disabled" disabled value={[]} onChange={() => {}} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'combobox') {
    return (
      <div className={styles.tokenPage}>
        {/* Default */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default ComboBox</h3>
          </div>
          <div className={styles.interactiveArea}>
            <ComboBox
              label="Select Framework"
              options={comboBoxOptions}
              value={comboBoxValue}
              onChange={setComboBoxValue}
              placeholder="Choose a framework..."
            />
          </div>
        </div>

        {/* With Description */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Description</h3>
          </div>
          <div className={styles.interactiveArea}>
            <ComboBox
              label="Frontend Framework"
              description="Select your preferred frontend framework"
              options={comboBoxOptions}
              value={comboBoxValue}
              onChange={setComboBoxValue}
            />
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Error</span>
              <ComboBox
                label="With Error"
                error="Please select a framework"
                options={comboBoxOptions}
                value=""
                onChange={() => {}}
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <ComboBox
                label="Disabled"
                disabled
                options={comboBoxOptions}
                value=""
                onChange={() => {}}
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Required</span>
              <ComboBox
                label="Required"
                required
                options={comboBoxOptions}
                value=""
                onChange={() => {}}
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Long List</span>
              <ComboBox
                label="20 Options"
                options={Array.from({ length: 20 }, (_, i) => ({
                  value: `item-${i}`,
                  label: `Option ${i + 1}`,
                }))}
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'datepicker') {
    return (
      <div className={styles.tokenPage}>
        {/* Basic */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Basic DatePicker</h3>
          </div>
          <div className={styles.interactiveArea}>
            <DatePicker
              label="Select Date"
              value={datePickerValue}
              onChange={setDatePickerValue}
              placeholder="Choose a date"
            />
          </div>
        </div>

        {/* Date Formats */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Date Formats</h3>
          </div>
          <div className={styles.stateRow}>
            {dateFormats.map(({ format, label }) => (
              <div className={styles.stateCell} key={format}>
                <span className={styles.stateLabel}>{label}</span>
                <DatePicker
                  label={format}
                  format={format}
                  value={datePickerValue}
                  onChange={setDatePickerValue}
                />
              </div>
            ))}
          </div>
        </div>

        {/* With Constraints */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>With Constraints</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Future Only</span>
              <DatePicker
                label="Future Dates"
                minDate={new Date()}
                value={datePickerValue}
                onChange={setDatePickerValue}
                helperText="Only dates from today onwards"
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Past Only</span>
              <DatePicker
                label="Past Dates"
                maxDate={new Date()}
                value={datePickerValue}
                onChange={setDatePickerValue}
                helperText="Only dates up to today"
              />
            </div>
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Error</span>
              <DatePicker
                label="With Error"
                error
                helperText="Please select a valid date"
                value={null}
                onChange={() => {}}
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <DatePicker label="Disabled" disabled value={null} onChange={() => {}} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'fileupload') {
    return (
      <div className={styles.tokenPage}>
        {/* Default */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Default File Upload</h3>
          </div>
          <div className={styles.interactiveArea}>
            <FileUpload
              label="Upload Files"
              helperText="Drag and drop files or click to browse"
              onFileChange={setFileUploadFiles}
            />
          </div>
        </div>

        {/* Single File */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Single File</h3>
          </div>
          <div className={styles.interactiveArea}>
            <FileUpload
              label="Profile Picture"
              multiple={false}
              accept="image/*"
              maxSize={5 * 1024 * 1024}
              helperText="JPG, PNG or GIF. Max 5MB"
            />
          </div>
        </div>

        {/* File Type Restrictions */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>File Type Restrictions</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Documents</span>
              <FileUpload
                label="Documents Only"
                accept=".pdf,.doc,.docx"
                helperText="PDF, DOC, DOCX"
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Images</span>
              <FileUpload label="Images Only" accept="image/*" helperText="Any image format" />
            </div>
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>States</h3>
          </div>
          <div className={styles.stateRow}>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Limited</span>
              <FileUpload
                label="Limited Files (Max 3)"
                maxFiles={3}
                helperText="Upload up to 3 files"
              />
            </div>
            <div className={styles.stateCell}>
              <span className={styles.stateLabel}>Disabled</span>
              <FileUpload label="Disabled" disabled placeholder="Upload is disabled" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubpage === 'filtertag') {
    return (
      <div className={styles.tokenPage}>
        {/* Basic */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Basic Filter Tags</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>default</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                {filterTags.map((tag) => (
                  <FilterTag key={tag} label={tag} />
                ))}
              </Inline>
            </div>
          </div>
        </div>

        {/* Active State */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Active State</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>active</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <FilterTag label="All Items" active />
                <FilterTag label="In Progress" />
                <FilterTag label="Completed" />
              </Inline>
            </div>
            <span className={styles.propsCode}>active</span>
          </div>
        </div>

        {/* Dismissible */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Dismissible</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>dismissible</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                {techTags.map((tag) => (
                  <FilterTag
                    key={tag}
                    label={tag}
                    dismissible
                    active
                    onDismiss={() => alert(`Removed ${tag}`)}
                  />
                ))}
              </Inline>
            </div>
            <span className={styles.propsCode}>dismissible active</span>
          </div>
        </div>

        {/* Without Trigger Icon */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Without Trigger Icon</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>no trigger</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                {categoryTags.map((tag) => (
                  <FilterTag key={tag} label={tag} showTrigger={false} />
                ))}
              </Inline>
            </div>
            <span className={styles.propsCode}>showTrigger={'{false}'}</span>
          </div>
        </div>

        {/* States */}
        <div className={styles.tokenSection}>
          <div className={styles.tokenSectionHeader}>
            <h3 className={styles.tokenSectionTitle}>Disabled States</h3>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>disabled</span>
            <div className={styles.demoPreviewWide}>
              <Inline gap="small">
                <FilterTag label="Disabled" disabled />
                <FilterTag label="Disabled Active" active disabled />
                <FilterTag label="Disabled Dismissible" dismissible disabled />
              </Inline>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
