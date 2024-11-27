import { describe } from 'vitest';
import ThMenu from './ThMenu.vue';
import * as common from './__test__/common';

describe('<ThMenu />', () => {
  describe('Menu rendering and interaction', () => {
    const items = [
      { title: 'Option 1', subItems: [{ title: 'Sub 1-1' }, { title: 'Sub 1-2' }] },
      { title: 'Option 2', subItems: [{ title: 'Sub 2-1' }, { title: 'Sub 2-2' }] },
    ];
    const location = 'bottom';
    const options = {
      props: {
        items: items,
        location: location,
      },
    };
    common.itMergesClass(ThMenu, {
      ...options,
      props: {
        ...options.props,
        class: 'extra-class',
      },
    });
    common.itMergesStyle(ThMenu, options);
  });
});
