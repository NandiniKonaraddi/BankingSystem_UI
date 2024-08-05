
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, DropdownItem } from "reactstrap";
import axios from 'axios';
import UserHeader from "components/Headers/UserHeader.js";
import React, { useEffect, useState } from 'react';
import Rootservice from "components/service/Rootservice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Depositwithdrawal = () => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('Deposit');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [bankAccount, setBankAccount] = useState('SBI Bank');
    const [accountNumber, setAccountNumber] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [account, setAccountType] = useState('Saving Account');
    const handleChangeBankAccount = async (e) => {
        const selectedBankAccount = e.target.value;
        setAccountType(selectedBankAccount);
        try {
            Rootservice.getaccountNumber({ selectedBankAccount, bankAccount }).then((response) => {
                setAccountNumber(response.data.accountNumber);
                setBankAccount(response.data.bankAccount)
                setMessage('')
            }).catch((error) => {
                console.log(error)
            })

        } catch (error) {
            setMessage('Account Not Found for this User')
            setAccountNumber('')
            console.error('Error fetching account number:', error);

        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount < 500) {
            setMessage('Minimum Balance is 500 Rupees')
            return
        }
        try {

            Rootservice.deposit({ amount, date, category, description, bankAccount, account,accountNumber, transactionType }).then((res) => {
                setAmount('');
                setDate('');
                setMessage('');
                setCategory('Deposit');
                setDescription('');
                setAccountNumber('');
                notify();
            }).catch((error) => {
                setMessage(error.response.data.message)
                console.log(error)
            })

        } catch (error) {
            console.error('Error submitting deposit:', error);
            setMessage('Error: Please try again later');
        }
    };
    const notify = () => toast.success('Amount Deposit Successfully!');

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
                                        <h3 className="mb-0">Deposit Details</h3>
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
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        Bank Account
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        id="input-bankaccount"
                                                        disabled
                                                        value={bankAccount}
                                                        onChange={(e) => setBankAccount(e.target.value)}>
                                                        <option value="SBI Bank">SBI Bank</option>
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Account Type
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        id="input-account"
                                                        value={account}

                                                        onChange={handleChangeBankAccount}>
                                                        <option value="Saving Account">Saving Account</option>
                                                        <option value="Current Account">Current Account</option>
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Account Number
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-accountNumber"
                                                        placeholder="Account Number"
                                                        type="number"
                                                        value={accountNumber}
                                                        onChange={(e) =>
                                                            setAccountNumber(e.target.value)
                                                        }
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">
                                        Deposit/Credit Information</h6>
                                        {/* <select
                                            style={{ width: "300px" }}
                                            className="form-control"
                                            id="input-bankaccount"
                                            value={transactionType}
                                            onChange={(e) =>
                                                setTransactionType(e.target.value)
                                            }>
                                            <option value="Credit">Credit</option>
                                            <option value="Dedit">Debit</option>

                                        </select>
                                    */}
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-amount"
                                                    >
                                                        Amount
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-amount"
                                                        placeholder="Enter Amount"
                                                        type="number"
                                                        value={amount}
                                                        onChange={(e) =>
                                                            setAmount(e.target.value)
                                                        }
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-date"
                                                    >
                                                        Date
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-date"
                                                        placeholder="Select Date"
                                                        type="date"
                                                        value={date}
                                                        onChange={(e) =>
                                                            setDate(e.target.value)
                                                        }
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-category"
                                                    >
                                                        Category
                                                    </label>

                                                    <select
                                                        className="form-control"
                                                        id="input-category"
                                                        value={category}
                                                        onChange={(e) =>
                                                            setCategory(e.target.value)
                                                        }>
                                                        <option value="Deposit">Deposit</option>
                                                        <option value="Withdrawal">Withdrawal</option>
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-description"
                                                    >
                                                        Description
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-description"
                                                        placeholder="Enter Description"
                                                        type="text"
                                                        value={description}
                                                        onChange={(e) =>
                                                            setDescription(e.target.value)
                                                        }
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    {message && (
                                        <small className="text-danger">{message}</small>
                                    )}
                                    <Row>
                                        <Col className="text-center" xs="12">
                                            <Button
                                                className="mt-4"
                                                color="primary"
                                                type="submit"
                                            >
                                                Deposite
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
    )
};
export default Depositwithdrawal;
