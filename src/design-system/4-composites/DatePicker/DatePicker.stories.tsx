import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { useState } from 'react';

const meta = {
  title: 'Ink Design System/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'DatePicker component for selecting dates with calendar popup.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: 'select',
      options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
      description: 'Date format for display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return <DatePicker value={date} onChange={setDate} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Select Date"
        value={date}
        onChange={setDate}
        placeholder="Choose a date"
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker value={date} onChange={setDate} />;
  },
};

// Date Formats
export const FormatUSA: Story = {
  name: 'Format: MM/DD/YYYY (USA)',
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2024, 0, 15));
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        format="MM/DD/YYYY"
        label="US Date Format"
      />
    );
  },
};

export const FormatEurope: Story = {
  name: 'Format: DD/MM/YYYY (Europe)',
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2024, 0, 15));
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        format="DD/MM/YYYY"
        label="European Date Format"
      />
    );
  },
};

export const FormatISO: Story = {
  name: 'Format: YYYY-MM-DD (ISO)',
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2024, 0, 15));
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        format="YYYY-MM-DD"
        label="ISO Date Format"
      />
    );
  },
};

// With Constraints
export const WithMinDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={today}
        label="Select Future Date"
        helperText="Only dates from today onwards are selectable"
      />
    );
  },
};

export const WithMaxDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        maxDate={today}
        label="Select Past Date"
        helperText="Only dates up to today are selectable"
      />
    );
  },
};

export const WithDateRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    return (
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
        label="Select Date (Next 30 Days)"
        helperText="Choose a date within the next 30 days"
      />
    );
  },
};

// States
export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        disabled
        label="Disabled DatePicker"
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        error
        label="Date of Birth"
        helperText="Please select a valid date"
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        label="Appointment Date"
        helperText="Select your preferred appointment date"
      />
    );
  },
};

// Use Cases
export const BirthdayPicker: Story = {
  name: 'Birthday Picker',
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const maxDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);

    return (
      <div style={{ width: '400px' }}>
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
          label="Date of Birth"
          helperText="Enter your date of birth"
          placeholder="MM/DD/YYYY"
        />
      </div>
    );
  },
};

export const EventDatePicker: Story = {
  name: 'Event Date Picker',
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const minDate = new Date();

    return (
      <div style={{ width: '400px' }}>
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={minDate}
          label="Event Date"
          helperText="Select the date for your event"
        />
      </div>
    );
  },
};

export const RangeForm: Story = {
  name: 'Date Range Form',
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <div style={{ width: '500px' }}>
        <div style={{ marginBottom: '20px' }}>
          <DatePicker
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (endDate && date && date > endDate) {
                setEndDate(null);
              }
            }}
            label="Start Date"
            helperText="Select the start date"
          />
        </div>
        <div>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            minDate={startDate || undefined}
            label="End Date"
            helperText="Select the end date (must be after start date)"
            disabled={!startDate}
          />
        </div>
      </div>
    );
  },
};

export const BookingForm: Story = {
  name: 'Booking Form',
  render: () => {
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const today = new Date();

    return (
      <div style={{
        width: '500px',
        padding: '32px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}>
        <h3 style={{ marginTop: 0 }}>Hotel Booking</h3>
        <div style={{ marginBottom: '24px' }}>
          <DatePicker
            value={checkIn}
            onChange={(date) => {
              setCheckIn(date);
              if (checkOut && date && date >= checkOut) {
                setCheckOut(null);
              }
            }}
            minDate={today}
            label="Check-in Date"
            placeholder="Select check-in date"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <DatePicker
            value={checkOut}
            onChange={setCheckOut}
            minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : today}
            label="Check-out Date"
            placeholder="Select check-out date"
            disabled={!checkIn}
          />
        </div>
        <button
          style={{
            width: '100%',
            padding: '12px',
            background: '#5000f7',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            opacity: checkIn && checkOut ? 1 : 0.5,
          }}
          disabled={!checkIn || !checkOut}
        >
          Search Available Rooms
        </button>
      </div>
    );
  },
};

export const MultiDateForm: Story = {
  name: 'Multiple Date Inputs',
  render: () => {
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [issueDate, setIssueDate] = useState<Date | null>(null);
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);

    return (
      <div style={{
        width: '500px',
        padding: '32px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}>
        <h3 style={{ marginTop: 0 }}>ID Document Details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <DatePicker
            value={birthDate}
            onChange={setBirthDate}
            maxDate={new Date()}
            label="Date of Birth"
            format="DD/MM/YYYY"
          />
          <DatePicker
            value={issueDate}
            onChange={(date) => {
              setIssueDate(date);
              if (expiryDate && date && date >= expiryDate) {
                setExpiryDate(null);
              }
            }}
            maxDate={new Date()}
            label="Issue Date"
            format="DD/MM/YYYY"
          />
          <DatePicker
            value={expiryDate}
            onChange={setExpiryDate}
            minDate={issueDate || new Date()}
            label="Expiry Date"
            format="DD/MM/YYYY"
            disabled={!issueDate}
          />
        </div>
      </div>
    );
  },
};

// Playground
export const Playground: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        label="Select Date"
        placeholder="Choose a date"
      />
    );
  },
};
