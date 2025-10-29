import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
    },
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Interactive wrapper for stories
const InteractiveSlider = (args: any) => {
  const [value, setValue] = useState(args.value || 50);
  return <Slider {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: InteractiveSlider,
  args: {
    label: 'Volume',
    value: 50,
  },
};

export const WithDescription: Story = {
  render: InteractiveSlider,
  args: {
    label: 'Brightness',
    description: 'Adjust the screen brightness level',
    value: 75,
  },
};

export const ShowValue: Story = {
  render: InteractiveSlider,
  args: {
    label: 'Temperature',
    description: 'Set the desired temperature',
    value: 72,
    showValue: true,
  },
};

export const CustomRange: Story = {
  render: InteractiveSlider,
  args: {
    label: 'Price Range',
    description: 'Maximum price you are willing to pay',
    min: 0,
    max: 1000,
    step: 50,
    value: 500,
    showValue: true,
  },
};

export const SmallSteps: Story = {
  render: InteractiveSlider,
  args: {
    label: 'Opacity',
    description: 'Adjust transparency (0.0 to 1.0)',
    min: 0,
    max: 1,
    step: 0.1,
    value: 0.8,
    showValue: true,
  },
};

export const Percentage: Story = {
  render: InteractiveSlider,
  args: {
    label: 'Progress',
    description: 'Task completion percentage',
    min: 0,
    max: 100,
    step: 5,
    value: 65,
    showValue: true,
  },
};

export const HideLabel: Story = {
  render: InteractiveSlider,
  args: {
    label: 'Hidden Label Slider',
    hideLabel: true,
    value: 30,
  },
};

export const Disabled: Story = {
  render: (args) => <Slider {...args} />,
  args: {
    label: 'Disabled Slider',
    description: 'This slider cannot be adjusted',
    value: 40,
    disabled: true,
    onChange: () => {},
  },
};

export const MinValue: Story = {
  render: InteractiveSlider,
  args: {
    label: 'At Minimum',
    value: 0,
    showValue: true,
  },
};

export const MaxValue: Story = {
  render: InteractiveSlider,
  args: {
    label: 'At Maximum',
    value: 100,
    showValue: true,
  },
};

export const CustomWidth: Story = {
  render: InteractiveSlider,
  args: {
    label: 'Custom Width',
    description: 'This slider has a custom width of 300px',
    value: 60,
    width: '300px',
    showValue: true,
  },
};

export const MultipleSliders: Story = {
  render: () => {
    const [rgb, setRgb] = useState({ r: 128, g: 64, b: 192 });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontSize: '18px', margin: 0, fontWeight: 600 }}>Color Mixer</h3>

        <Slider
          label="Red"
          value={rgb.r}
          onChange={(r) => setRgb({ ...rgb, r })}
          min={0}
          max={255}
          showValue
        />

        <Slider
          label="Green"
          value={rgb.g}
          onChange={(g) => setRgb({ ...rgb, g })}
          min={0}
          max={255}
          showValue
        />

        <Slider
          label="Blue"
          value={rgb.b}
          onChange={(b) => setRgb({ ...rgb, b })}
          min={0}
          max={255}
          showValue
        />

        <div
          style={{
            marginTop: '12px',
            padding: '20px',
            borderRadius: '4px',
            backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            color: rgb.r + rgb.g + rgb.b > 384 ? '#000' : '#fff',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          rgb({rgb.r}, {rgb.g}, {rgb.b})
        </div>
      </div>
    );
  },
};

export const AudioControls: Story = {
  render: () => {
    const [volume, setVolume] = useState(75);
    const [bass, setBass] = useState(50);
    const [treble, setTreble] = useState(50);
    const [balance, setBalance] = useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
        <h3 style={{ fontSize: '18px', margin: 0, fontWeight: 600 }}>Audio Settings</h3>

        <Slider
          label="Volume"
          description="Overall audio volume"
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          showValue
        />

        <Slider
          label="Bass"
          description="Low frequency emphasis"
          value={bass}
          onChange={setBass}
          min={0}
          max={100}
          showValue
        />

        <Slider
          label="Treble"
          description="High frequency emphasis"
          value={treble}
          onChange={setTreble}
          min={0}
          max={100}
          showValue
        />

        <Slider
          label="Balance"
          description="Left-right audio balance"
          value={balance}
          onChange={setBalance}
          min={-50}
          max={50}
          step={5}
          showValue
        />
      </div>
    );
  },
};

export const TemperatureControl: Story = {
  render: () => {
    const [temp, setTemp] = useState(68);

    return (
      <div style={{ maxWidth: '350px' }}>
        <Slider
          label="Thermostat"
          description={`Set to ${temp}°F - ${temp < 65 ? 'Cool' : temp > 75 ? 'Warm' : 'Comfortable'}`}
          value={temp}
          onChange={setTemp}
          min={60}
          max={85}
          step={1}
          showValue
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState(50);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
        <h3 style={{ fontSize: '18px', margin: 0, fontWeight: 600 }}>All Slider States</h3>

        <Slider
          label="Normal Slider"
          description="Standard interactive slider"
          value={normalValue}
          onChange={setNormalValue}
          showValue
        />

        <Slider
          label="With Value Display"
          value={75}
          onChange={() => {}}
          showValue
        />

        <Slider
          label="Without Value Display"
          value={25}
          onChange={() => {}}
        />

        <Slider
          label="Disabled State"
          description="This slider is disabled"
          value={60}
          onChange={() => {}}
          disabled
          showValue
        />

        <Slider
          label="Hidden Label"
          hideLabel
          value={40}
          onChange={() => {}}
        />
      </div>
    );
  },
};
