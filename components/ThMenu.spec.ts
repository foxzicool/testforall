import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ThMenu from '~/components/ThMenu.vue';
import * as common from './__test__/common';

describe('<ThMenu />', () => {
  const items = [
    {
      title: 'Main Option 1',
      to: 'https://nuxt.com',
      external: false,
      icon: 'menu' as const,
      subItems: [
        {
          title: 'Suboption 1-1',
          to: 'https://nuxt.com',
          external: false,
          icon: 'menu' as const
        },
        {
          title: 'Suboption 1-2',
          to: 'https://nuxt.com',
          external: true,
          icon: 'menu' as const,
          subItems: [
            { title: 'Sub-suboption 1-2-1', to: 'https://nuxt.com', external: false, icon: 'menu' as const },
            { title: 'Sub-suboption 1-2-2', to: 'https://nuxt.com', external: true, icon: 'menu' as const }
          ]
        }
      ]
    }
  ];
  
  const props = {
    items,
    buttonLabel: 'About Us',
    icon: 'arrow_right' as const
  };
  it('shows icons for each menu item with an icon property', async () => {
    const wrapper = await mountSuspended(ThMenu, { props });
    items.forEach(item => {
      if (item.icon) {
        const itemIcon = wrapper.findComponent({ name: 'ThIcon', props: { icon: item.icon } });
        expect(itemIcon.exists()).toBe(true);
      }
      item.subItems?.forEach(subItem => {
        if (subItem.icon) {
          const subItemIcon = wrapper.findComponent({ name: 'ThIcon', props: { icon: subItem.icon } });
          expect(subItemIcon.exists()).toBe(true);
        }
        subItem.subItems?.forEach(subSubItem => {
          if (subSubItem.icon) {
            const subSubItemIcon = wrapper.findComponent({ name: 'ThIcon', props: { icon: subSubItem.icon } });
            expect(subSubItemIcon.exists()).toBe(true);
          }
        });
      });
    });
  });

  it('renders button with label and icon', async () => {
    const wrapper = await mountSuspended(ThMenu, { props });
    expect(wrapper.text()).toContain(props.buttonLabel);
    const buttonIcon = wrapper.findComponent({ name: 'ThIcon' });
    expect(buttonIcon.exists()).toBe(true);
    expect(buttonIcon.props('icon')).toBe(props.icon);
  });
  common.itMergesClass(ThMenu, { props });
  common.itMergesStyle(ThMenu, { props });
});
