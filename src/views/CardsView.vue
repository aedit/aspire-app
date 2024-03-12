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

    <q-dialog v-model="newCard" @hide="popupClosed">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add New Card</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Please input your name below
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="newCardDetail" autofocus @keyup.enter="addCard" />
        </q-card-section>

        <q-card-section class="q-pt-none text-negative">
          {{ newCardAddError }}
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Card" @click="addCard" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    const newCardDetail = ref('');
    const newCardAddError = ref('')

    const store = useStore();

    const addCard = () => {
      console.log(newCardDetail.value)

      if (newCardDetail.value === '') {
        newCardAddError.value = 'Please input a name';
        return;
      }
      store.dispatch('addCard', newCardDetail.value)
      newCard.value = false;
      newCardAddError.value = ''
      newCardDetail.value = ''
    }

    const popupClosed = () => {
      newCardAddError.value = ''
      newCardDetail.value = ''
    }

    onMounted(() => {
            store.dispatch('fetchCards')
    })

    return {
      tabs: ref('my-cards'),
      newCard,
      newCardDetail,
      newCardAddError,
      addCard,
      popupClosed
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
