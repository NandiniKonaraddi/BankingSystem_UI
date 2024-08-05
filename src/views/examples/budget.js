
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from 'reactstrap';
import UserHeader from "components/Headers/UserHeader.js";
import Rootservice from "components/service/Rootservice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  setAmount,
  setDate,
  setCategory,
  setDescription,
  setMessage,
  setBankAccount,
  setAccountNumber,
  setBalance,
  setAccountType,
  setTransactionType
} from '../actions/budgetActions';

const Budget = () => {
  const dispatch = useDispatch();
  const {
    amount,
    date,
    category,
    description,
    message,
    bankAccount,
    accountNumber,
    balance,
    account,
    transactionType
  } = useSelector(state => state.budget);


  const handleChangeBankAccount = async (e) => {
    const selectedBankAccount = e.target.value;
    dispatch(setAccountType(selectedBankAccount));
    try {
      const response = await Rootservice.getTransaction({ bankAccount, selectedBankAccount });
      dispatch(setAccountNumber(response.data.accountNumber));
      dispatch(setBankAccount(response.data.bankAccount));
      dispatch(setBalance(response.data.amount));
      dispatch(setMessage(''));
    } catch (error) {
      dispatch(setMessage('Account Not Found for this User'));
      dispatch(setAccountNumber(''));
      dispatch(setAmount(''));
      console.error('Error fetching account number:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(balance) < parseFloat(amount)) {
      return dispatch(setMessage("Insufficient Balance"));
    }
    try {
      await Rootservice.deposit({ amount, date, category, description, bankAccount, account, accountNumber, transactionType });
      dispatch(setAmount(''));
      dispatch(setDate(''));
      dispatch(setCategory('Groceries'));
      dispatch(setDescription(''));
      dispatch(setAccountNumber(''));
      dispatch(setBalance(''));
      toast.success('Amount Paid Successfully!');
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
      console.log(error);
    }
  };

  return (
    <div>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Budgets Details</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" href="#pablo" size="sm">
                      Debit Amount
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    Bank Accounts Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            Bank Account
                          </label>
                          <select
                            className="form-control"
                            id="input-bankaccount"
                            disabled
                            value={bankAccount}
                            onChange={(e) => dispatch(setBankAccount(e.target.value))}
                          >
                            <option value="SBI Bank">SBI Bank</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Account Type
                          </label>
                          <select
                            className="form-control"
                            id="input-account"
                            value={account}
                            onChange={handleChangeBankAccount}
                          >
                            <option value="Saving Account">Saving Account</option>
                            <option value="Current Account">Current Account</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Account Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-accountNumber"
                            placeholder="Account Number"
                            type="number"
                            disabled
                            value={accountNumber}
                            onChange={(e) => dispatch(setAccountNumber(e.target.value))}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Account Balance
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-accountBalance"
                            placeholder="Account Balance"
                            type="number"
                            value={balance}
                            disabled
                            onChange={(e) => dispatch(setBalance(e.target.value))}
                            required
                          />
                          {message && (
                            <small className="text-danger">{message}</small>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Budget Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-amount">
                            Amount
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-amount"
                            placeholder="Enter Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => dispatch(setAmount(e.target.value))}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-date">
                            Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-date"
                            placeholder="Select Date"
                            type="date"
                            value={date}
                            onChange={(e) => dispatch(setDate(e.target.value))}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-category">
                            Category
                          </label>
                          <select
                            className="form-control"
                            id="input-category"
                            value={category}
                            onChange={(e) => dispatch(setCategory(e.target.value))}
                          >
                            <option value="Groceries">Groceries</option>
                            <option value="Movie">Movie</option>
                            <option value="Shopping">Shopping</option>
                            <option value="House Rent">House Rent</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-description">
                            Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-description"
                            placeholder="Enter Description"
                            type="text"
                            value={description}
                            onChange={(e) => dispatch(setDescription(e.target.value))}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />

                  <Row>
                    <Col className="text-center" xs="12">
                      <Button className="mt-4" color="primary" type="submit">
                        Buy
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Budget;
