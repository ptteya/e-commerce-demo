export const paymentFormInitialValues = {
    method: 'Cash on Delivery',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    phone: '',
    address: '',
    email: '',
};

export const paymentMethods = [
    { id: 'cash-on-delivery', label: 'Cash on Delivery', value: 'Cash on Delivery' },
    { id: 'credit-card', label: 'Credit Card', value: 'Credit Card' },
];