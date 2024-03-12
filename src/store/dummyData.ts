import Card from '@/types/Card';

const dummyCard: Card = {
    cardNumber: "1234123412341234",
    cardHolderName: 'Mark Henry',
    expiry: new Date(2027, 3, 23),
    cvv: 456,
    cardCompany: 'Aspire',
    cardType: 'VISA',
    isFreeze: false,
    isCanceled: false,
    spendLimit: 10000,
    transactions: [
        {
            amount: 100,
            icon: 'icon-storage',
            iconColor: '#23CEFD',
            transactionParty: 'Hamleys',
            transactionDate: new Date('March 12, 2024'),
            transactionType: 'debit',
            transactionMessage: 'Charged to debit card',
        },
        {
            amount: 100,
            icon: 'icon-flights',
            iconColor: '#01D167',
            transactionParty: 'Hamleys',
            transactionDate: new Date('February 29, 2024'),
            transactionType: 'credit',
            transactionMessage: 'Charged to debit card',
        },
        {
            amount: 100,
            icon: 'icon-megaphone',
            iconColor: '#23CEFD',
            transactionParty: 'Hamleys',
            transactionDate: new Date('February 12, 2024'),
            transactionType: 'debit',
            transactionMessage: 'Charged to debit card',
        },
        {
            amount: 100,
            icon: 'icon-storage',
            transactionParty: 'Hamleys',
            iconColor: '#23CEFD',
            transactionDate: new Date('February 1, 2024'),
            transactionType: 'debit',
            transactionMessage: 'Charged to debit card',
        },
        {
            amount: 100,
            icon: 'icon-flights',
            iconColor: '#F25195',
            transactionParty: 'Hamleys',
            transactionDate: new Date('January 31, 2024'),
            transactionType: 'debit',
            transactionMessage: 'Charged to debit card',
        },
        {
            amount: 100,
            icon: 'icon-megaphone',
            transactionParty: 'Hamleys',
            iconColor: '#F25195',
            transactionDate: new Date('January 20, 2024'),
            transactionType: 'debit',
            transactionMessage: 'Charged to debit card',
        },
        {
            amount: 100,
            icon: 'icon-storage',
            transactionParty: 'Hamleys',
            iconColor: '#01D167',
            transactionDate: new Date('January 7, 2024'),
            transactionType: 'debit',
            transactionMessage: 'Charged to debit card',
        },
    ],
};

export default dummyCard;
