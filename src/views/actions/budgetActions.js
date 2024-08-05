export const SET_AMOUNT = 'SET_AMOUNT';
export const SET_DATE = 'SET_DATE';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_BANK_ACCOUNT = 'SET_BANK_ACCOUNT';
export const SET_ACCOUNT_NUMBER = 'SET_ACCOUNT_NUMBER';
export const SET_BALANCE = 'SET_BALANCE';
export const SET_ACCOUNT_TYPE = 'SET_ACCOUNT_TYPE';
export const SET_TRANSACTION_TYPE = 'SET_TRANSACTION_TYPE';

export const setAmount = (amount) => ({
  type: SET_AMOUNT,
  payload: amount
});

export const setDate = (date) => ({
  type: SET_DATE,
  payload: date
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category
});

export const setDescription = (description) => ({
  type: SET_DESCRIPTION,
  payload: description
});

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message
});

export const setBankAccount = (bankAccount) => ({
  type: SET_BANK_ACCOUNT,
  payload: bankAccount
});

export const setAccountNumber = (accountNumber) => ({
  type: SET_ACCOUNT_NUMBER,
  payload: accountNumber
});

export const setBalance = (balance) => ({
  type: SET_BALANCE,
  payload: balance
});

export const setAccountType = (account) => ({
  type: SET_ACCOUNT_TYPE,
  payload: account
});

export const setTransactionType = (transactionType) => ({
  type: SET_TRANSACTION_TYPE,
  payload: transactionType
});
