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
    const icons = wrapper.findAll('.th-icon');
    expect(icons.length).toBeGreaterThan(0);
  
    let iconIndex = 0;
    items.forEach((item) => {
      if (item.icon) {
        expect(icons[iconIndex].isVisible()).toBe(true);
        iconIndex++;
      }
      item.subItems.forEach((subItem) => {
        if (subItem.icon) {
          expect(icons[iconIndex].isVisible()).toBe(true);
          iconIndex++;
        }
        subItem.subItems.forEach((subSubItem) => {
          if (subSubItem.icon) {
            expect(icons[iconIndex].isVisible()).toBe(true);
            iconIndex++;
          }
        });
      });
    });
  });
  
  common.itMergesClass(ThMenu, { props });
  common.itMergesStyle(ThMenu, { props });

});
