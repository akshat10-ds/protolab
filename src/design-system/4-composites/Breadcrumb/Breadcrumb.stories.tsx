import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1l7 6v8H1V7l7-6zm0 2L3 7v6h10V7L8 3z" />
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 3h5l2 2h7v9H1V3zm1 2v7h12V7H7.5L5.5 5H2z" />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 1h7l3 3v10H3V1zm1 1v11h8V5h-3V2H4z" />
  </svg>
);

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <HomeIcon /> },
      { label: 'Documents', href: '/documents', icon: <FolderIcon /> },
      { label: 'Project', href: '/documents/project', icon: <FolderIcon /> },
      { label: 'README.md', icon: <FileIcon /> },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard' },
    ],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Computers', href: '/products/electronics/computers' },
      { label: 'Laptops', href: '/products/electronics/computers/laptops' },
      { label: 'Gaming', href: '/products/electronics/computers/laptops/gaming' },
      { label: 'Product Details' },
    ],
  },
};

export const MaxItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Computers', href: '/products/electronics/computers' },
      { label: 'Laptops', href: '/products/electronics/computers/laptops' },
      { label: 'Gaming', href: '/products/electronics/computers/laptops/gaming' },
      { label: 'Product Details' },
    ],
    maxItems: 4,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics' },
    ],
    separator: '>',
  },
};

export const ArrowSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Article' },
    ],
    separator: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M4 2l4 4-4 4V2z" />
      </svg>
    ),
  },
};

export const NonCollapsible: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops' },
    ],
    collapsible: false,
  },
};

export const WithClickHandler: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics' },
    ],
    onItemClick: (item, index) => {
      alert(`Clicked: ${item.label} at index ${index}`);
    },
  },
};

export const LongLabels: Story = {
  args: {
    items: [
      { label: 'Home Dashboard', href: '/' },
      { label: 'Product Management System', href: '/products' },
      { label: 'Electronic Devices and Accessories', href: '/products/electronics' },
      { label: 'High Performance Gaming Laptops' },
    ],
  },
};

export const MobilePreview: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
      { label: 'Gaming' },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
