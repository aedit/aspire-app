import { createStore } from 'vuex'
import dummyCard from './dummyData'
import Card from '@/types/Card'

export interface State {
  cards: Card[]
}

export default createStore<State>({
  state: {
    cards: []
  },
  getters: {
  },
  mutations: {
    addCard(state: State, card: Card) {
      state.cards.push(card);
    },
    updateCards(state: State, cards: Card[]) {
      state.cards = cards;
    },
    freezeCard(state: State, { cardNumber }: { cardNumber: string }) {
      const card = state.cards.find((el: Card) => el.cardNumber === cardNumber);
      if (card)
        card.isFreeze = !card.isFreeze
    }
  },
  actions: {
    fetchCards({ state, commit }) {
      // Logic to fetch cards from server
      try {
        // do something
        fetch('https://jsonplaceholder.typicode.com/posts?limit=10')
          .then((response) => response.json())
          .then(() => {
            // Dummy logic to add own cards
            if (state.cards.length === 0)
              commit('updateCards', [dummyCard]);
          });
      } catch (e) {
        // catch errors and update
      }
    },
    addCard({ commit }, userName: string) {
      try {
        // Logic to push card to the backend

        const cardNumber = Math.random().toString().substring(2, 18);

        const cvv = Math.random().toString().substring(2, 5);

        console.log(cardNumber);

        const card = {
          cardNumber,
          cardHolderName: userName,
          expiry: new Date(new Date().getTime() + Math.random() * (new Date(2030, 11, 31).getTime() - new Date().getTime())),
          cvv,
          cardCompany: 'Aspire',
          cardType: 'VISA',
          isFreeze: false,
          isCanceled: false,
          spendLimit: 10000,
          transactions: []
        }

        commit('addCard', card);
      } catch (e) {
        // catch errors
      }
    },
  },
  modules: {
  }
})
