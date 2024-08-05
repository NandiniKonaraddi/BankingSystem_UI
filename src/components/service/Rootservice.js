import axios from "axios";
const api = "http://localhost:3050"
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer your_auth_token_here'
};
const register = (data) => {
  return axios.post(api + "/register/", data, { headers: headers })
}
const login = (data) => {
  return axios.post(api + "/login/", data, { headers: headers })
}
const profile = (data) => {
  return axios.post(api + "/update-profile/", data, { headers: headers })
}
const getprofile = (data) => {
  return axios.post(api + "/update-profile/get-profile", data, { headers: headers })
}
const createaccount = (data) => {
  return axios.post(api + "/update-account/", data, { headers: headers })
}
const getaccountupdate = (data) => {
  return axios.post(api + "/update-account/get-accountupdate", data, { headers: headers })
}
const getaccount = (data) => {
  return axios.post(api + "/update-account/get-account", data, { headers: headers })
}
const getaccountNumber = (data) => {
  return axios.post(api + "/credit-debit/get-accountNumber", data, { headers: headers })
}
const deposit = (data) => {
  return axios.post(api + "/credit-debit/deposit", data, { headers: headers })
}
const getTransaction = (data) => {
  return axios.post(api + "/transaction-history/get-accountNumber", data, { headers: headers })
}
const getTransactionHistory = (data) => {
  return axios.post(api + "/transaction-history/get-accountHistory", data, { headers: headers })
}
export default {
  register, login, profile, getprofile, createaccount,
  getaccountupdate, getaccount, getTransactionHistory,
  getaccountNumber, deposit, getTransaction
}