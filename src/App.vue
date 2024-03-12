<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer 
      show-if-above
      :mini="$q.screen.width < 1300"
      :width="340"
      class="bg-secondary text-white q-pa-xl"
    >
      <q-list>
        <q-item-label header class="q-pa-none flex flex-start">
          <img src="./assets/Aspire-Logo.svg" alt="Aspire Logo" height="35px">
        </q-item-label>
        <q-item-label class="text-white-opacity-30 q-pt-md">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </q-item-label>
        <div class="q-pt-xl">
          <q-item v-for="item in menuOptions" :key="item.title" clickable tag="a" :to="item.routeTo" class="q-my-lg q-pa-none">
            <q-item-section avatar>
              <q-icon :name="item.icon"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1">{{item.title}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutDefault',
  components: {
  },
  setup() {
    const menuOptions = [
      {
        title: 'Home',
        icon: 'icon-Home',
        routeTo: '/'
      },
      {
        title: 'Cards',
        icon: 'icon-Card',
        routeTo: '/cards'
      },
      {
        title: 'Payments',
        icon: 'icon-Payments',
        routeTo: '/payments'
      },
      {
        title: 'Credit',
        icon: 'icon-arrowed-up',
        routeTo: '/credit'
      },
      {
        title: 'Settings',
        icon: 'icon-Account',
        routeTo: '/settings'
      },
    ]
    return {
      menuOptions
    }
  }
})
</script>