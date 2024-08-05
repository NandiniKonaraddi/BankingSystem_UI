import {
    SET_AMOUNT,
    SET_DATE,
    SET_CATEGORY,
    SET_DESCRIPTION,
    SET_MESSAGE,
    SET_BANK_ACCOUNT,
    SET_ACCOUNT_NUMBER,
    SET_BALANCE,
    SET_ACCOUNT_TYPE,
    SET_TRANSACTION_TYPE
  } from './budgetActions';

  const initialState = {
    amount: '',
    date: '',
    category: 'Groceries',
    description: '',
    message: '',
    bankAccount: 'SBI Bank',
    accountNumber: '',
    balance: '',
    account: 'Saving Account',
    transactionType: 'Debit'
  };

  const budgetReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_AMOUNT:
        return { ...state, amount: action.payload };
      case SET_DATE:
        return { ...state, date: action.payload };
      case SET_CATEGORY:
        return { ...state, category: action.payload };
      case SET_DESCRIPTION:
        return { ...state, description: action.payload };
      case SET_MESSAGE:
        return { ...state, message: action.payload };
      case SET_BANK_ACCOUNT:
        return { ...state, bankAccount: action.payload };
      case SET_ACCOUNT_NUMBER:
        return { ...state, accountNumber: action.payload };
      case SET_BALANCE:
        return { ...state, balance: action.payload };
      case SET_ACCOUNT_TYPE:
        return { ...state, account: action.payload };
      case SET_TRANSACTION_TYPE:
        return { ...state, transactionType: action.payload };
      default:
        return state;
    }
  };

  export default budgetReducer;
