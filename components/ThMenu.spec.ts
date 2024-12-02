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

  common.itMergesClass(ThMenu, { props });
  common.itMergesStyle(ThMenu, { props });

  // 如果以后想要测试嵌套菜单项，可以取消下面的注释
  /*
  describe('nested menu items', () => {
    it('renders all menu items with correct attributes and submenus', async () => {
      const wrapper = await mountSuspended(ThMenu, { props });
      const listItems = wrapper.findAll('.v-list-item');
      expect(listItems.length).toBeGreaterThan(0);

      listItems.forEach((item, index) => {
        const flatItems = items.flatMap(i => [i].concat(i.subItems || []));
        const expectedItem = flatItems[index];
        expect(item.text()).toContain(expectedItem.title);
        if (expectedItem.icon) {
          expect(item.find('.th-icon').exists()).toBe(true);
        }
      });
    });
  });
  */
});
