<template>
  <div class="text-center">
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props">
          {{ label }}
          <ThIcon v-if="icon" :icon />
        </v-btn>
      </template>
      <v-list>
        <template v-for="(item, index) in items" :key="`${index}-${item.title}`">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <template v-if="!item?.subItems">
                  <NuxtLink :to="item.to">{{ item.title }}</NuxtLink>
                </template>
                <template v-else>
                  {{ item.title }}
                </template>
              </v-list-item-title>
            </v-list-item-content>
            <template #append>
              <ThIcon v-if="item.subItems?.length && item.icon" :icon="item.icon" />
            </template>
            <v-menu v-if="item.subItems?.length" open-on-hover activator="parent" submenu>
              <v-list>
                <template v-for="(subItem, subIndex) in item.subItems" :key="`${index}-${subIndex}-${subItem.title}`">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <template v-if="!subItem?.subItems">
                          <NuxtLink :to="subItem.to">{{ subItem.title }}</NuxtLink>
                        </template>
                        <template v-else>
                          {{ subItem.title }}
                        </template>
                      </v-list-item-title>
                    </v-list-item-content>
                    <template #append>
                      <ThIcon v-if="subItem.subItems?.length && subItem.icon" :icon="subItem.icon" />
                    </template>
                    <v-menu v-if="subItem.subItems?.length" open-on-hover activator="parent" submenu>
                      <v-list>
                        <template v-for="(subSubItem, subSubIndex) in subItem.subItems" :key="`${index}-${subIndex}-${subSubIndex}-${subSubItem.title}`">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>
                                <template v-if="!subSubItem?.subItems">
                                  <NuxtLink :to="subSubItem.to">{{ subSubItem.title }}</NuxtLink>
                                </template>
                                <template v-else>
                                  {{ subSubItem.title }}
                                </template>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-menu>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import ThIcon from '~/components/icon';

type IconName = 'arrow_right' | 'dropdown' | 'menu';
interface MenuItem {
  title: string;        
  to?: string;         
  external?: boolean;  
  icon?: IconName;    
  subItems?: MenuItem[]; 
}
type Props = { items: MenuItem[]; label: string; icon?: IconName; };
const { items, label, icon } = defineProps<Props>();
</script>
