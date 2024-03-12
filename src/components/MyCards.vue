<template>
  <div class="my-cards row q-pa-md">
    <div class="col-xs-12 col-sm-12 col-md-6 col flex column items-center">
        <q-carousel 
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            swipeable
            keep-alive
            :navigation="false"
            height="auto"
        >
            <q-carousel-slide v-for="card in cards" :key="card.cardNumber" :name="card.cardNumber">
                <CardImage :card="card" />
            </q-carousel-slide>
        </q-carousel>

        <div class="q-mb-xl">
            <span 
                v-for="card in cards" 
                :key="card.cardNumber" 
                @click="slide = card.cardNumber" 
                class="carousel-navigation q-mr-sm"
                :class="{'carousel-navigation--active': card.cardNumber === slide}"
            />
        </div>

        <div class="row card-menu q-py-md q-px-lg font-13">
            <div class="flex column col flex-center cursor-pointer" @click="toggleCardFreeze(slide)">
                <img src="@/assets/freeze.svg" alt="freeze" srcset="">
                <span class="q-mt-xs flex">Freeze Card</span>
            </div>
            <div class="flex column col flex-center cursor-pointer">
                <img src="@/assets/spend.svg" alt="spend" srcset="">
                <span class="q-mt-xs flex">Set Spend Limit</span>
            </div>
            <div class="flex column col flex-center cursor-pointer">
                <img src="@/assets/GPay.svg" alt="gpay" srcset="">
                <span class="q-mt-xs flex">Add to Gpay</span>
            </div>
            <div class="flex column col flex-center cursor-pointer">
                <img src="@/assets/replace.svg" alt="replace" srcset="">
                <span class="q-mt-xs flex">Replace Card</span>
            </div>
            <div class="flex column col flex-center cursor-pointer">
                <img src="@/assets/delete.svg" alt="cancel" srcset="">
                <span class="q-mt-xs flex">Cancel Card</span>
            </div>
        </div>
    </div>

    <div class="col-xs-12 col-sm-12 col-md-6 col q-pt-xl">
        <q-expansion-item class="q-mb-lg" expand-icon="icon-down-arrow" expand-icon-class="expansion-header-icon">
          <template v-slot:header>
            <div class="flex items-center text-secondary font-14 q-pa-lg">
                <img src="@/assets/card-details.svg" alt="cancel" srcset="" class="q-mr-md">
                <span>Card Details</span>
            </div>
          </template>
          <div>
            Card Details goes here
          </div>
        </q-expansion-item>

        <q-expansion-item expand-icon="icon-down-arrow" expand-icon-class="expansion-header-icon">
          <template v-slot:header>
            <div class="flex items-center text-secondary font-14 q-pa-lg">
                <img src="@/assets/transactions.svg" alt="cancel" srcset="" class="q-mr-md">
                <span>Recent Transactions</span>
            </div>
          </template>
          <div class="transactions-list">
            <div v-if="getCardTransaction(slide).length === 0" class="flex flex-center text-negative font-14 q-pa-lg text-bold">
              No transactions to show
            </div>
            <div v-else class="flex column">
              <div v-for="item in getCardTransaction(slide)?.slice(0,4)" :key="item" 
                class="transaction-list__item flex justify-between q-mx-lg q-py-md">
                <div class="flex">
                  <div class="flex q-mr-md">
                  <q-icon :name="item.icon" class="rounded-borders q-pa-md" :style="{ backgroundColor: item.iconColor + '30', color: item.iconColor, borderRadius: '50%' }"></q-icon>
                </div>

                  <div class="flex column">
                    <span class="text-semibold font-14 q-mb-sm">{{ item.transactionParty }}</span>
                    <span class="font-13 q-mb-sm">{{ getTransactionDate(item.transactionDate) }}</span>
                    <span class="text-accent font-12 text-semibold">
                      <q-icon name="icon-Card" class="bg-accent q-pa-sm font-10" color="white" style="border-radius: 50%;"></q-icon>
                      {{  item.transactionMessage }}</span>
                    </div>
                  </div>
                <div>
                  <span class="text-bold" :class="{'text-primary': item.transactionType === 'credit'}">
                    {{ item.transactionType === 'credit' ? '+' : '-' }} S$
                    {{  item.amount }}
                  </span>
                  <q-icon color="grey" name="icon-next" class="font-10 q-ml-md cursor-pointer" />
                </div>
            </div>
            <div v-if="getCardTransaction(slide).length > 4" class="text-primary text-semibold flex q-py-md flex-center cursor-pointer" style="background-color: #EDFFF5;">
              View all card transactions
            </div>
            </div>
            
            
          </div> 
        </q-expansion-item>
    </div>
  </div>
</template>

<script lang="ts">
import Card from '@/types/Card';
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import CardImage from './CardImage.vue';

export default defineComponent({
    name: 'MyCards',
    components: {
        CardImage
    },
    setup() {
        const store = useStore();
      
        const cards = computed(() => store.state.cards)

      
        const slide = ref(cards.value?.[0]?.cardNumber || '')
    
        watch(cards, () => {
            if(cards.value)
                slide.value = cards.value[0].cardNumber;
        })

        const getCardTransaction = (id : string) => {
            if (!id) return [];
            return cards.value.find((el:Card) => el.cardNumber === id)?.transactions;
        }

        const toggleCardFreeze = (cardNumber: string) => {
            console.log(cardNumber)
            store.commit('freezeCard', { cardNumber })
        }
        
        return {
            slide,
            cards,
            getCardTransaction,
            toggleCardFreeze,
        }
    },
    methods: {
        getTransactionDate(date: Date) {
            return date.toLocaleDateString('en-GB', {
                day: '2-digit', month: 'short', year: 'numeric'
            })
        }
    }
});
</script>

<style lang="scss">
.my-cards {
    flex: 1;
    border: 1px solid #FCFCFC;
    border-radius: 8px;
    box-shadow: 0px 2px 12px #00000014;

    .carousel-navigation {
        height: 8px;
        display: inline-block;
        width: 8px;
        background-color: #01D16730;
        border-radius: 50%;
        cursor: pointer;

        &--active{
            width: 16px;
            border-radius: 8px;
            background-color: #01D167;
        }
    }

    .card-menu{
        background-color: #EDF3FF;
        border-radius: 8px;
        max-width: 400px;

        span {
            text-align: center;
        }
    }

    .q-expansion-item {
        border: 1px solid #F5F5F5;
        box-shadow: 0 0 8px #0000000A;
        border-radius: 8px;

        .q-item {
            padding: 0;
            background-color: #F5F9FF;
            justify-content: space-between;
        }
    }

    .expansion-header-icon {
        .icon-down-arrow {
            font-size: 16px;
            color: #D8E1F3;
        }
    }

    .transaction-list__item {
        border-bottom: 1px solid #F5F5F5;
    }
}

</style>