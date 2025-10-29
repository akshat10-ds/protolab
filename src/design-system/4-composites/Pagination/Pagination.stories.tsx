import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const SimpleMode: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    mode: 'simple',
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const WithoutFirstLast: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    showFirstLast: false,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const WithItemsPerPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    showItemsPerPage: true,
    itemsPerPage: 25,
    onPageChange: (page) => console.log('Page changed to:', page),
    onItemsPerPageChange: (items) => console.log('Items per page changed to:', items),
  },
};

export const Disabled: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    disabled: true,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    return (
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          Showing page {currentPage} of {totalPages}
        </div>
      </div>
    );
  },
};

export const InteractiveWithItemsPerPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalItems = 247;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1); // Reset to first page
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showItemsPerPage
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          Showing {startItem}-{endItem} of {totalItems} items
        </div>
      </div>
    );
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const TwoPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const CustomMaxButtons: Story = {
  args: {
    currentPage: 10,
    totalPages: 50,
    maxPageButtons: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const MobileView: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
