<template>
    <div class="card-image" :class="{'disabled': card.isFreeze}">
        <div 
            class="text-primary text-bold font-12 flex items-center justify-end q-mb-sm cursor-pointer" 
            @click="showCardDetails = !showCardDetails"
        > 
            <q-icon name="icon-eye" color="primary" class="q-mr-sm"></q-icon>
            {{showCardDetails? 'Hide' : 'Show'}} Card Number
        </div>
        <div class="bg-primary text-white flex column q-pa-lg">
            <div class="self-end">
                <img src="../assets/Aspire-Logo-white.svg" alt="Aspire Logo" height="24px">
            </div>
            <div class="text-h5 text-bold q-mt-lg">{{card.cardHolderName}}</div>
            <div class="q-mt-lg text-bold card-number">
                <span v-for="(item,i) in getCardNumber(card.cardNumber)" :key="i" class="q-mr-lg">
                    {{ item }}
                </span>
            </div>
            <div class="q-mt-md text-bold">
                <span class="q-mr-lg">Thru: {{getCardExpiry(card.expiry)}}</span>
                <span>CVV: {{showCardDetails ? card.cvv : '***'}}</span>
            </div>
            <div class="self-end q-mt-sm">
                <img src="../assets/Visa Logo.svg" alt="Visa Logo" height="24px">
            </div> 
        </div>
    </div>
</template>

<style></style>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import Card from '@/types/Card';

export default defineComponent({
    name: 'CardView',
    props: {
        card: {
            type: Object as PropType<Card>,
            required:true
        }
    },
    setup() {
        return {
            showCardDetails: ref(false),
        }
    },
    methods: {
        getCardNumber(cardNumber:string) {
            if (this.showCardDetails) {
                return cardNumber.match(/.{1,4}/g)
            }
            return ['••••', '••••', '••••', cardNumber.substring(12,16)]
        },
        getCardExpiry(expiry: Date) {
            const monthStrings = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
            return monthStrings[expiry.getMonth()] + ' / ' + expiry.getFullYear() % 100
        }
    }
})
</script>

<style lang="scss">
.card-image{
    max-width: 400px;
    min-width: 400px;
}

.card-number{
    letter-spacing: 3.5px;
}

</style>
