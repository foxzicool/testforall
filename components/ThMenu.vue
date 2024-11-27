<template>
  <div class="text-center">
    <v-menu :location>
      <template #activator="{ props }">
        <v-btn v-bind="props">
          {{ buttonLabel }}
          <ThIcon v-if="icon" :icon />
        </v-btn>
      </template>
      <v-list>
        <template v-for="item in items" :key="item.title">
          <v-list-item>
            <template v-if="item.subItems && item.subItems.length > 0">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <ThIcon v-if="item.icon" :icon="item.icon" />
              <v-menu activator="parent" open-on-hover submenu>
                <v-list>
                  <template v-for="subItem in item.subItems" :key="subItem.title">
                    <v-list-item>
                      <template v-if="subItem.subItems && subItem.subItems.length > 0">
                        <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                        <ThIcon v-if="subItem.icon" :icon="subItem.icon" />
                        <v-menu activator="parent" open-on-hover submenu>
                          <v-list>
                            <template v-for="subSubItem in subItem.subItems" :key="subSubItem.title">
                              <v-list-item>
                                <NuxtLink :to="subSubItem.to" :target="subSubItem.external ? '_blank' : null" class="full-width">
                                  <v-list-item-title>{{ subSubItem.title }}</v-list-item-title>
                                  <ThIcon v-if="subSubItem.icon" :icon="subSubItem.icon" />
                                </NuxtLink>
                              </v-list-item>
                            </template>
                          </v-list>
                        </v-menu>
                      </template>
                      <template v-else>
                        <NuxtLink :to="subItem.to" :target="subItem.external ? '_blank' : null" class="full-width">
                          <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                          <ThIcon v-if="subItem.icon" :icon="subItem.icon" />
                        </NuxtLink>
                      </template>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
            </template>
            <template v-else>
              <NuxtLink :to="item.to" :target="item.external ? '_blank' : null" class="full-width">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <ThIcon v-if="item.icon" :icon="item.icon" />
              </NuxtLink>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import ThIcon, { type icons } from '~/components/icon';

type Anchor = 'top' | 'bottom' | 'start' | 'end' | 'center';

interface MenuItem {
  title: string;
  icon?: (typeof icons)[number];
  subItems?: Array<MenuItem>;
}

type Props = {
  items: MenuItem[];
  location: Anchor;
  buttonLabel: string;
  icon?: (typeof icons)[number];
};

const { items, location, buttonLabel, icon } = defineProps<Props>();
</script>
