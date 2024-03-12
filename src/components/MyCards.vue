<template>
  <div class="my-cards row q-pa-lg">
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
            <div class="flex column col flex-center cursor-pointer" @click="freezeCard(slide)">
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

    <div class="col-xs-12 col-sm-12 col-md-6 col">
        
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

        const cardMenuOptions = [
            {
                title: 'Freeze Limit'
            }
        ]
      
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

        const freezeCard = (cardNumber: string) => {
            console.log(cardNumber)
        }
        
        return {
            slide,
            cards,
            getCardTransaction,
            freezeCard,
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
}

</style>