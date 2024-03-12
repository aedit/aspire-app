import Transaction from "./Transaction"

export default interface Card {
    cardNumber: string,
    cardHolderName: string,
    expiry: Date,
    cvv: number,
    cardCompany: string,
    cardType: string,
    isFreeze: boolean,
    isCanceled: boolean,
    spendLimit: number,
    transactions: Transaction[]
}