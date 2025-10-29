import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';
import { useState } from 'react';

const meta: Meta<typeof SearchInput> = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 1h7l3 3v10H3V1zm1 1v11h8V5h-3V2H4z" />
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 3h5l2 2h7v9H1V3zm1 2v7h12V7H7.5L5.5 5H2z" />
  </svg>
);

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'React components',
  },
};

export const Loading: Story = {
  args: {
    defaultValue: 'Searching...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search...',
    disabled: true,
  },
};

export const NotClearable: Story = {
  args: {
    defaultValue: 'Cannot clear this',
    clearable: false,
  },
};

export const WithSuggestions: Story = {
  args: {
    placeholder: 'Search users...',
    suggestions: [
      { id: '1', label: 'John Doe', description: 'john@example.com', icon: <UserIcon /> },
      { id: '2', label: 'Jane Smith', description: 'jane@example.com', icon: <UserIcon /> },
      { id: '3', label: 'Bob Johnson', description: 'bob@example.com', icon: <UserIcon /> },
      { id: '4', label: 'Alice Williams', description: 'alice@example.com', icon: <UserIcon /> },
    ],
  },
};

export const FileSuggestions: Story = {
  args: {
    placeholder: 'Search files...',
    suggestions: [
      { id: '1', label: 'README.md', description: 'Project documentation', icon: <FileIcon /> },
      { id: '2', label: 'package.json', description: 'Package dependencies', icon: <FileIcon /> },
      { id: '3', label: 'src', description: 'Source files', icon: <FolderIcon /> },
      { id: '4', label: 'components', description: 'React components', icon: <FolderIcon /> },
      { id: '5', label: 'App.tsx', description: 'Main application file', icon: <FileIcon /> },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const allItems = [
      'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
      'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
    ];

    const handleChange = (newValue: string) => {
      setValue(newValue);
      if (newValue) {
        const filtered = allItems.filter(item =>
          item.toLowerCase().includes(newValue.toLowerCase())
        );
        setResults(filtered);
      } else {
        setResults([]);
      }
    };

    return (
      <div>
        <SearchInput
          value={value}
          onChange={handleChange}
          placeholder="Search fruits..."
          suggestions={results.map((item, i) => ({
            id: String(i),
            label: item,
          }))}
          onSuggestionSelect={(suggestion) => {
            alert(`Selected: ${suggestion.label}`);
          }}
        />
        <div style={{ marginTop: '16px', fontSize: '14px' }}>
          Current value: {value || '(empty)'}
        </div>
      </div>
    );
  },
};

export const WithDebounce: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    return (
      <div>
        <SearchInput
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          debounceMs={500}
          placeholder="Type to see debounce (500ms)..."
        />
        <div style={{ marginTop: '16px', fontSize: '14px' }}>
          <div>Immediate value: {value || '(empty)'}</div>
          <div>Debounced value: {debouncedValue || '(empty)'}</div>
        </div>
      </div>
    );
  },
};

export const WithSearchHandler: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
      <div>
        <SearchInput
          placeholder="Type and press Enter..."
          onSearch={(value) => {
            setSearchTerm(value);
            alert(`Searching for: ${value}`);
          }}
        />
        <div style={{ marginTop: '16px', fontSize: '14px' }}>
          Last search: {searchTerm || '(none)'}
        </div>
      </div>
    );
  },
};

export const LongSuggestionsList: Story = {
  args: {
    placeholder: 'Search countries...',
    suggestions: [
      'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
      'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
      'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus',
      'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
    ].map((country, i) => ({
      id: String(i),
      label: country,
      description: `Country in ${i % 2 === 0 ? 'Europe' : 'Asia'}`,
    })),
  },
};

export const WithClearHandler: Story = {
  render: () => {
    const [value, setValue] = useState('Initial value');

    return (
      <SearchInput
        value={value}
        onChange={setValue}
        onClear={() => {
          alert('Search cleared!');
        }}
      />
    );
  },
};

export const CustomIcon: Story = {
  args: {
    placeholder: 'Search with custom icon...',
    searchIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
      </svg>
    ),
  },
};
