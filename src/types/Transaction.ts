export default interface Transaction {
    amount: number,
    icon: string,
    iconColor: string,
    transactionParty: string,
    transactionDate: Date,
    transactionType: 'debit' | 'credit',
    transactionMessage: string,
};
