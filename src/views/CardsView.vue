<template>
  <q-page class="cards-page flex column q-pa-xl">
    <header class="q-mb-md">
      <div class="q-pb-md font-14">
        Available balance
      </div>
      <div class="flex justify-between flex-center">
        <div class="flex flex-row flex-center">
          <span class="font-13 text-bold bg-primary text-white flex flex-center q-mr-sm cards-page__header__currency">S$</span>
          <span class="text-h5 text-bold">3,000</span>
        </div>
        
        <q-btn color="accent" size="xs" no-caps class="font-13 flex flex-center q-pa-sm" @click="newCard = true">
          <q-icon name="icon-add" />
          <q-item-label class="q-ml-sm font-13">New card</q-item-label>
        </q-btn>
      </div>
    </header>

    <div class="tabs flex q-mt-lg q-mb-md font-14">
      <div class="tabs__item cursor-pointer q-pb-sm" :class="{ 'tabs__item--active': tabs === 'my-cards' }"
        @click="tabs = 'my-cards'">
        My debit cards
      </div>
      <div class="tabs__item cursor-pointer q-pb-sm" @click="tabs = 'all-cards'"
        :class="{ 'tabs__item--active': tabs === 'all-cards' }">
        All company cards
      </div>
    </div>

    <my-cards v-if="tabs === 'my-cards'" />

    <div v-else class="row q-pa-lg">
      All Cards
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import MyCards from '@/components/MyCards.vue';
import { useStore } from 'vuex';


export default defineComponent({
  name: 'CardsView',
  components: {
    MyCards
  },
  setup() {
    const newCard = ref(false)

    const store = useStore();

    onMounted(() => {
            store.dispatch('fetchCards')
    })

    return {
      tabs: ref('my-cards'),
      newCard
    }
  }
});
</script>

<style lang="scss">
.cards-page {

  &__header {

    &__currency {
      border-radius: 4px;
      padding: 2px 12px;
    }

  }

  .tabs {
    font-weight: 600;
    gap: 2rem;

    &__item {
      color: rgba(0, 0, 0, 0.3);

      &--active {
        border-bottom: 3px solid $accent-secondary;
        color: black;
      }
    }

  }

}
</style>
