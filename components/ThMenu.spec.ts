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
    location: 'top' as const,
    buttonLabel: 'About Us',
    icon: 'arrow_right' as const
  };

  it('renders button with label and icon', async () => {
    const wrapper = await mountSuspended(ThMenu, { props });
    expect(wrapper.text()).toContain(props.buttonLabel);
    expect(wrapper.findComponent({ name: 'ThIcon' }).exists()).toBe(true);
  });
  it('renders all icons for menu items at every level', async () => {
    const wrapper = await mountSuspended(ThMenu, { props });
    items.forEach((item, i) => {
      if (item.icon) {
        expect(wrapper.findAll('.th-icon')[i].isVisible()).toBe(true);
      }
      if (item.subItems) {
        item.subItems.forEach((subItem, j) => {
          if (subItem.icon) {
            expect(wrapper.findAll('.th-icon')[i + j + 1].isVisible()).toBe(true);
          }
          if (subItem.subItems) {
            subItem.subItems.forEach((subSubItem, k) => {
              if (subSubItem.icon) {
                expect(wrapper.findAll('.th-icon')[i + j + k + 2].isVisible()).toBe(true);
              }
            });
          }
        });
      }
    });
  });
  common.itMergesClass(ThMenu, { props });
  common.itMergesStyle(ThMenu, { props });

});
