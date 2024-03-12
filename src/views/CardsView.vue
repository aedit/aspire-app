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

    <div>

    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CardsView',
  components: {
  },
  setup() {
    const newCard = ref(false)

    return {
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

}
</style>
