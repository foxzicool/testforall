import type { Meta, StoryFn } from '@storybook/vue3';
import ThMenu from '~/components/ThMenu.vue';
import type { ThMenuProps } from '~/components/types';

export default {
  title: 'Components/ThMenu',
  component: ThMenu,
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu items with subitems, each item might include a "to" and "external" property for links.',
    },
    location: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end', 'center'],
      description: 'Menu anchor location',
    },
    buttonLabel: {
      control: 'text',
      description: 'Label for the dropdown button',
    },
  },
} as Meta<ThMenuProps>;

const Template: StoryFn<ThMenuProps> = (args) => ({
  components: { ThMenu },
  setup() {
    return { args };
  },
  template: '<ThMenu v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      title: '主选项 1',
      to: 'https://nuxt.com',
      external: false,
      subItems: [
        {
          title: '子选项 1-1',
          to: 'https://nuxt.com',
          external: false
        },
        {
          title: '子选项 1-2',
          to: 'https://nuxt.com',
          external: true,
          subItems: [
            { title: '子子选项 1-2-1', to: 'https://nuxt.com', external: false },
            { title: '子子选项 1-2-2', to: 'https://nuxt.com', external: true }
          ]
        }
      ]
    },
    {
      title: '主选项 2',
      to: 'https://nuxt.com',
      external: true,
      subItems: [
        {
          title: '子选项 2-1',
          to: 'https://nuxt.com',
          external: false
        },
        {
          title: '子选项 2-2',
          to: 'https://nuxt.com',
          external: false
        }
      ]
    }
  ],
  buttonLabel: '關於我們',
  location: 'top'
};

