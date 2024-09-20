import type { Meta, StoryObj } from '@storybook/react';
import AppWrapper from 'appWrapper';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/App',
  component: AppWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {}
} satisfies Meta<typeof AppWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    widgetConfig: {
      chainlitServer: 'http://livechat.galadon.com/live',
      theme: 'light',
      themeColor: 'lightBlue',
      fontColor: 'white',
      chatBotID: '6f132ee6-ec3d-49a9-b322-78490af27d71',
      avatarUrl:
        'https://1b9ec2f03c80658a2d24eed1bd587405.cdn.bubble.io/f1726514144724x771264442655368300/png-clipart-re%CC%81sume%CC%81-writing-resume-curriculum-vitae-job-job-seeker-template-resume%20dBackground%20Removed%201.png'
    }
  }
};

export const Secondary: Story = {
  args: {
    widgetConfig: {
      chainlitServer: 'http://0.0.0.0:8066/live',
      theme: 'dark',
      fontFamily: '"Nunito Sans"',
      chatBotID: 'e297323a-2b65-488b-b320-646b744204ab'
    }
  }
};
